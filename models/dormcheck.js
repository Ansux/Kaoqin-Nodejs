var mongoose = require('mongoose');
var DormcheckSchema = require('../schemas/dormcheck');
var Dormcheck = mongoose.model('Dormcheck', DormcheckSchema);

module.exports = Dormcheck;