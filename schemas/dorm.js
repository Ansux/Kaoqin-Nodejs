var mongoose = require('mongoose');
var DormSchema = new mongoose.Schema({
    dno: Number,
    build: Number,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    meta: {
        createAt: {
            type: Date,
            defautl: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

DormSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

DormSchema.statics = {
    fetch: function (callback) {
        return this
            .find({})
            .sort('meta.updateAt')
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

module.exports = DormSchema;