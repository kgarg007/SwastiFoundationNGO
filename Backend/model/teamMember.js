const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamMemberSchema = new Schema({
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
  }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
