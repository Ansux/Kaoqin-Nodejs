var mongoose = require('mongoose');
var CheckSchema = require('../schemas/check');
var Check = mongoose.model('Check', CheckSchema);

module.exports = Check;