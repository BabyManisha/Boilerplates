const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = mongoose.Schema({
    userId: String,
    authType: String,
    username: String,
    profilePic: String,
    todos: Array,
    addedDefaults: Boolean,
},{
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);