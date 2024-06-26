const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  jobid:{
    type:Number,
    required: true,
    unique: true
  },
  jobCreatorId: {
    type: String
  },
  jobcreatorEmail: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  vacancies: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  requiredExperience: {
    type: Number,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  approved:{
    type: Boolean,
    default: false
  },
  expired: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const JobPostingmodel = mongoose.model('JobPosting', jobPostingSchema);
module.exports = JobPostingmodel;
