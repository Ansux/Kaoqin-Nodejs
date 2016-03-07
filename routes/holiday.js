var Holiday = require('../models/holiday');

exports.list = function (req, res) {
    Holiday.fetch(function (err, holidays) {
        res.render('holiday-list', {
            title: '假期列表',
            holidays: holidays
        })
    })
}

exports.new = function (req, res) {

}

exports.save = function (req, res) {

}