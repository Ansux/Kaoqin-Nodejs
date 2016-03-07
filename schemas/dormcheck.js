var mongoose = require('mongoose');
var DormcheckSchema = new mongoose.Schema({
    dno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dorm'
    },
    checkdate: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    score: Number,
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

DormcheckSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

DormcheckSchema.statics = {
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
};

module.exports = DormcheckSchema;