var Dorm = require('../models/dorm');

exports.new = function (req, res) {
    res.render('dorm-new', {
        title: '添加宿舍'
    })
}

exports.save = function (req, res) {
    var dormObj = req.body.dorm;
    var _dorm = new Dorm(dormObj);
    _dorm.save(function (err, dorm) {
        console.log(dorm);
        res.redirect('/admin/dorm/list');
    })
}

exports.list = function (req, res) {
    Dorm
        .find({})
        .populate('admin', 'sname')
        .exec(function (err, dorms) {
            res.render('dorm-list', {
                title: '宿舍列表',
                dorms: dorms
            })
        })
}

exports.detail = function (req, res) {
//    var id = req.body.uid;
//    if (id) {
//        Student.findById(id, function (err, student) {
//            console.log(student);
//            res.json(student);
//        })
//    }
}