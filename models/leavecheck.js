var mongoose = require('mongoose');
var LeavecheckSchema = require('../schemas/leavecheck');
var Leavecheck = mongoose.model('Leavecheck', LeavecheckSchema);

module.exports = Leavecheck;