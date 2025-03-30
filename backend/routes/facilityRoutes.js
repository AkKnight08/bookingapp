const express = require('express');
const Facility = require('../models/Facility');
const router = express.Router();

// Get all facilities
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching facilities',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get a specific facility
router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json(facility);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching facility',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get nearby facilities
router.get('/nearby', async (req, res) => {
  const { location } = req.query;
  try {
    const facilities = await Facility.find({ location: { $regex: location, $options: 'i' } });
    res.status(200).json(facilities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;