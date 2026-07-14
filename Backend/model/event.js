const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  registrationDetails: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
