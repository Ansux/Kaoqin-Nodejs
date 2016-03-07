var mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema({
    sno: String,
    pwd: String,
    sname: String,
    sex: String,
    birthday: Date,
    class: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
    },
    dorm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dorm'
    },
    phone: String,
    email: String,
    role: Number,
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

StudentSchema.pre('save', function (next) {
    if (this.isNew) {
        this.role = 1;
        this.pwd = this.sno;
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

StudentSchema.statics = {
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
}

module.exports = StudentSchema;