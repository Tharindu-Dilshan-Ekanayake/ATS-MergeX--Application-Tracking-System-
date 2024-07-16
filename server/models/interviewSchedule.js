const mongoose = require('mongoose');

const interviewScheduleSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    jobtitle:{
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    assign: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        required: true 
    },
    description:{
        type:String,
        required: true
    },
    send:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const InterviewSchedule = mongoose.model('InterviewSchedule', interviewScheduleSchema);
module.exports = InterviewSchedule;
