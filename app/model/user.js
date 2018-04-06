const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /\s+@\s+\.\s+/
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', schema);
