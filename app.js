var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 80;

app.set('views', './views/pages');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kaoqin');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'kaoqin',
    store: new mongoStore({
        url: 'mongodb://localhost/kaoqin',
        collection: 'sessions'
    })
}));

app.locals.moment = require('moment');
app.locals.pretty = true;

app.listen(port, function () {
    console.log("I'm running in " + port);
});


var index = require('./routes');

app.use(function (req, res, next) {
    var _admin = req.session.admin;
    app.locals.admin = _admin;
    return next();
});

app.get('/', index.index);

// admin routes
var admin = require('./routes/admin');
app.get('/signin', admin.showSignin);
app.post('/signin', admin.signin);
app.get('/signup', admin.showSignup);
app.post('/signup/save', admin.signup);
app.get('/admin/user/list', admin.list);
app.post('/admin/user/detail', admin.detail);
app.post('/admin/user/update/save', admin.update);
app.get('/admin', admin.index);

// student routes
var student = require('./routes/student');
app.get('/admin/student/list', student.list);
app.post('/admin/student/detail', student.detail);
app.post('/admin/student/update', student.update);
app.post('/admin/student/updateSave', student.updateSave);
app.get('/admin/student/new', student.new);
app.post('/admin/student/save', student.save);

// dorm routes
var dorm = require('./routes/dorm');
app.get('/admin/dorm/new', dorm.new);
app.post('/admin/dorm/save', dorm.save);
app.get('/admin/dorm/list', dorm.list);
app.get('/admin/dorm/detail', dorm.detail);

// class routes
var clazz = require('./routes/class');
app.get('/admin/class/new', clazz.new);
app.post('/admin/class/save', clazz.save);
app.get('/admin/class/list', clazz.list);

// holiday routes
var holiday = require('./routes/holiday');
app.get('/admin/holiday/list', holiday.list);
app.get('/admin/holiday/new', holiday.new);
app.post('/admin/holiday/save', holiday.save);

// check routes
var check = require('./routes/check');
app.get('/admin/check/list', check.list);
app.get('/admin/check/new', check.new);
app.post('/admin/check/save', check.save);
app.get('/admin/check/count', check.count);

// 404 page
app.use(function (req, res, next) {
    var err = new Error('404 Not Found');
    err.status = 404;
    next(err);
});

// error page
app.use(function (err, req, res, next) {
    res.render('error', {
        title: 'error',
        message: err.message,
        error: {}
    });
});