const mongoose = require('mongoose');
const { Schema } = mongoose;

const storySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  story: {
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

module.exports = mongoose.model('Story', storySchema);
