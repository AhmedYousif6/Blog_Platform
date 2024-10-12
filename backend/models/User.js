const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email format'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'User name must be at least 3 characters'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters'],
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
