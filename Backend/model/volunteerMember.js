const mongoose = require('mongoose');
const { Schema } = mongoose;

const volunteerMemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  imagePublicId: {
    type: String
  },
  linkedin: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('VolunteerMember', volunteerMemberSchema);
