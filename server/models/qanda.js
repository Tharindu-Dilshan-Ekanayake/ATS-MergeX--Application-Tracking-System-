const mongoose = require('mongoose');

const qandaSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    sent: {
        type: Boolean,
        default: false
    },
    reply:{
        type : String,
        default: null
    }
}, {timestamps: true});

const QandAmodel = mongoose.model('QandA', qandaSchema);

module.exports = QandAmodel;