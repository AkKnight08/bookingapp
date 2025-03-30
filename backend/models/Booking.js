const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  facility: {
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1']
  },
  date: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['online', 'cash']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    required: true
  },
  bookingTime: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add validation for booking date
bookingSchema.pre('save', function(next) {
  const bookingDate = new Date(this.bookingDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  bookingDate.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    next(new Error('Booking date cannot be in the past'));
  } else {
    next();
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;