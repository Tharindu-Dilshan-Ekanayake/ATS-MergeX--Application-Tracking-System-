const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    education:{
        type:String,
    },
    bio:{
        type:String,
    },
    dob:{
        type:String,
    },
    gender:{
        type:String,
    },
    image: String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
