var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    uid: String,
    pwd: String,
    fullname: String,
    sex: String,
    phone: String,
    email: String,
    role: {
        type: Number,
        default: 10
    },
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

AdminSchema.methods = {
    valitePwd: function (pwd) {
        if (this.pwd == pwd) {
            return true;
        } else {
            return false;
        }
    }
}

AdminSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

AdminSchema.statics = {
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

module.exports = AdminSchema;