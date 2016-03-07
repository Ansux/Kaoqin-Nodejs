var mongoose = require('mongoose');
var HolidaySchema = require('../schemas/holiday');
var Holiday = mongoose.model('Holiday', HolidaySchema);

module.exports = Holiday;