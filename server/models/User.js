const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// come back and add Order when that model is defined
// const Order = require('./Order');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    role: {
        type: String,
        required: false
    }
// come back and attach orders once that model is defined
//  orders: [Order.schema]
});

// set up pre-save middleware to create a password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next()
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
