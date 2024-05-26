const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({

    user_id:{
        type: String,
        required: true
    },
    user_fname:{
        type: String,
    },
    user_lname:{
        type: String,
    },
    user_email:{
        type: String,
    },
    time:{
        type: String,
    },
    image:{
        type:String,
    },
    description:{
        type: String,
    }

});
const Statusmodel = mongoose.model('Status', statusSchema);
module.exports = Statusmodel;