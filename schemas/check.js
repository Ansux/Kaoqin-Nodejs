var mongoose = require('mongoose');
var CheckSchema = new mongoose.Schema({
    cno: Number,
    holiday: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Holiday'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    leave: {
        type: Date,
        default: Date.now()
    },
    back: {
        type: Date,
        default: Date.now()
    },
    status: String
});

CheckSchema.pre('save', function (next) {
    if (this.isNew) {
        this.status = '离校';
    }
    next();
});

CheckSchema.statics = {
    fetch: function (callback) {
        return this
            .find({})
            .sort('leave')
            .exec(callback);
    },
    findById: function (id, callback) {
        return this
            .findOne({
                _id: id
            })
            .exec(callback);
    }
};

module.exports = CheckSchema;