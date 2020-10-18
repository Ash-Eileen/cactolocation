const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  location: [
    {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
  ],
  health: {
    type: String,
    enum: ['healthy', 'clip carefully', 'leave alone for now'],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true,
  },
  modified_date: {
    type: Date,
    required: true,
  },
});

mongoose.model('Pin', PinSchema);
