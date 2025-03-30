const express = require('express');
const Booking = require('../models/Booking');
const Facility = require('../models/Facility');
const auth = require('../middleware/auth');
const router = express.Router();

// Book a facility
router.post('/', auth, async (req, res) => {
  try {
    const {
      facility,
      quantity,
      duration,
      date,
      paymentMethod,
      totalAmount,
      paymentStatus,
      bookingDate,
      bookingTime,
      userId
    } = req.body;

    if (!facility || !quantity || !duration || !date || !paymentMethod || !totalAmount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = new Booking({
      facility,
      quantity,
      duration,
      date,
      paymentMethod,
      totalAmount,
      paymentStatus,
      bookingDate,
      bookingTime,
      userId: req.user.userId
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get all bookings for a user
router.get('/user/:userId', auth, async (req, res) => {
  try {
    if (req.params.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to access these bookings' });
    }

    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Get a specific booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to access this booking' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
});

// Cancel a booking
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Cannot cancel a paid booking' });
    }

    booking.paymentStatus = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

module.exports = router;
