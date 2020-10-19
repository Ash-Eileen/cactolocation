const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  coords: [
    {
      long: Number,
      lat: Number,
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('Pin', PinSchema);
