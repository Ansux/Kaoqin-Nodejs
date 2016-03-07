var Admin = require('../models/admin');
var _ = require('underscore');

exports.index = function (req, res) {
    res.render('admin-index', {
        title: '管理员首页'
    })
}

exports.showSignin = function (req, res) {
    res.render('signin', {
        title: '管理员登录'
    })
}

exports.signin = function (req, res) {
    var uid = req.body.uid;
    var pwd = req.body.pwd;
    Admin.findOne({
        uid: uid
    }, function (err, admin) {
        if (!admin) {
            return res.redirect('/signup');
        }
        var validate = admin.valitePwd(pwd);
        if (validate) {
            req.session.admin = admin;
            console.log('pwd is matched.');
            return res.redirect('/admin');
        } else {
            console.log('pwd is not matched.');
            return res.redirect('/signin');
        }
    })
}

exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '用户注册'
    })
}

exports.signup = function (req, res) {
    var adminObj = req.body.admin;
    var _admin = new Admin(adminObj);
    _admin.save(function (err, admin) {
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/user/list');
    })
}

exports.list = function (req, res) {
    Admin.fetch(function (err, admins) {
        res.render('list', {
            title: '管理员列表',
            admins: admins
        })
    })
}

exports.detail = function (req, res) {
    var id = req.body.uid;
    console.log(id);
    if (id) {
        Admin.findById(id, function (err, admin) {
            console.log(admin);
            res.json(admin);
        })
    }
}

exports.update = function (req, res) {
    var id = req.body.id;
    var fullname = req.body.fullname;
    var sex = req.body.sex;
    var phone = req.body.phone;
    var email = req.body.email;
    var adminObj = {
        fullname: fullname,
        sex: sex,
        phone: phone,
        email: email
    };
    Admin.findById(id, function (err, admin) {
        var _admin = _.extend(admin, adminObj);
        _admin.save(function (err, admin) {
            res.json({
                result: 'ok'
            });
        })
    });

}