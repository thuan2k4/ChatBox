const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, minLength: 6, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilePic: { type: String, default: "" }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
