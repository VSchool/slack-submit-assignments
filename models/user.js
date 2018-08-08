const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.rmPwd = function(){
    const user = this.toObject();
    delete user.password;
    return user;
}
userSchema.methods.auth = function (pwdAttempt, cb) {
    bcrypt.compare(pwdAttempt, this.password, (err, isMatch) => {
        if (err) cb(false);
        return cb(isMatch);
    });
}

module.exports = mongoose.model("User", userSchema);