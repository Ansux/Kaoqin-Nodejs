var mongoose = require('mongoose');
var LeavecheckSchema = new mongoose.Schema({
    vacation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacation'
    },
    sno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    leave: {
        type: Date,
        default: Date.now()
    },
    return: Date,
    status: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

LeavecheckSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

LeavecheckSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb);
    }
}

module.exports = LeavecheckSchema;