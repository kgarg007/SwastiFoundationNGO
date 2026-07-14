const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerSubmissionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  resumeUrl: {
    type: String
  },
  resumePublicId: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('CareerSubmission', careerSubmissionSchema);
