const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: { index: true } },
    password: { type: String, required: true },
    resetCode: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('user', userSchema, 'user')