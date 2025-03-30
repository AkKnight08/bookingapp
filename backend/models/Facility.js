const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['dry storage', 'cold storage'], required: true },
  capacity: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  amenities: [String],
  rating: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Facility', facilitySchema);
