const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// Get all facilities
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find({});
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facilities', error: error.message });
  }
});

// Get single facility
router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facility', error: error.message });
  }
});

module.exports = router; 