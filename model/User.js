const mongoose = require("mongoose")
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const UserSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

UserSchema.methods.toJSON = function() { // BE->FE 데이터 전송시(데이터 타입은 json.) 항상 호출. 즉, 객체가 제이슨으로 바뀔 때마다 호출.
    // return this
    const obj = this._doc;
    delete obj.password;
    delete obj.updatedAt;
    delete obj.__v;
    return obj
}

UserSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id}, JWT_SECRET_KEY, {expiresIn: "1d"})
    return token
}

const User = mongoose.model("User", UserSchema)
module.exports = User