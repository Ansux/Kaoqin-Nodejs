var Student = require('../models/student');
var Class = require('../models/class');
var Dorm = require('../models/dorm');
var _ = require('underscore');

exports.list = function (req, res) {
    Student
        .find({})
        .populate('class', 'cno')
        .populate('dorm', 'dno')
        .exec(function (err, students) {
            res.render('student-list', {
                title: '学生列表',
                students: students
            })
        })
}

exports.new = function (req, res) {
    Class.find({}, function (err, classes) {
        Dorm.find({}, function (err, dorms) {
            res.render('student-new', {
                title: '添加学生',
                classes: classes,
                dorms: dorms
            })
        })
    })
}

exports.save = function (req, res) {
    var stuObj = req.body.student;
    var _student = new Student(stuObj);
    _student.save(function (err, student) {
        res.redirect('/admin/student/list');
    })
}

exports.detail = function (req, res) {
    var id = req.body.id;
    console.log(id);
    if (id) {
        Student
            .findOne({
                _id: id
            })
            .populate('class', 'cno')
            .populate('dorm', 'dno')
            .exec(function (err, student) {
                console.log(student);
                res.json(student);
            })
    }
}

exports.update = function (req, res) {
    var id = req.body.id;
    Student.findById(id, function (err, student) {
        Class.find({}, {}, {}, function (err, classes) {
            Dorm.find({}, {}, {}, function (err, dorms) {
                var obj = {};
                obj.student = student;
                obj.classes = classes;
                obj.dorms = dorms;
                console.log(obj);
                res.json(obj)
            })
        })
    })
}

exports.updateSave = function (req, res) {
    var stuObj = {};
    var id = req.body._id;
    stuObj.sname = req.body.sname;
    stuObj.sex = req.body.sex;
    stuObj.class = req.body.class;
    stuObj.dorm = req.body.dorm;
    console.log(stuObj);
    Student.findById(id, function (err, student) {
        var _student = _.extend(student, stuObj);
        _student.save(function (err, student) {
            res.json({
                result: 'ok'
            });
        })
    })
}