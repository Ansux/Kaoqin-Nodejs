var Class = require('../models/class');
var Student = require('../models/student');
var Admin = require('../models/admin');

exports.new = function (req, res) {
    res.render('class-new', {
        title: '添加班级'
    })
}

exports.save = function (req, res) {
    var classObj = req.body.class;
    var admin = classObj.admin;
    console.log(admin);
    var _class = new Class(classObj);
    Admin.findOne({
        uid: admin
    }, function (err, admin) {
        console.log(admin._id);
        _class.admin = admin._id;
        _class.save(function (err, claszz) {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/class/list');
        })
    })
}

exports.list = function (req, res) {
    Class
        .find({})
        .populate('admin', 'fullname')
        .exec(function (err, classes) {
            /*Student.aggregate([{
                    $group: {
                        _id: "$class",
                        count: {
                            $sum: 1
                        }
                    }
            }], function (err, docs) {
                console.log(docs.count)
                console.log(classes);
            })
            */
            console.log(classes);
            res.render('class-list', {
                title: 'ClassList',
                classes: classes
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