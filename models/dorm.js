var mongoose = require('mongoose');
var DormSchema = require('../schemas/dorm');
var Dorm = mongoose.model('Dorm', DormSchema);

module.exports = Dorm;