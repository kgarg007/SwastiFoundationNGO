const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  imagePublicId: {
    type: String,
    required: true
  },
  ratio: {
    type: String,
    default: '1/1'
  }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
