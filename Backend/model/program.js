const mongoose = require('mongoose');
const { Schema } = mongoose;

const programSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  locations: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
