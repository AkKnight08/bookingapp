const mongoose = require('mongoose');
const Facility = require('../models/Facility'); // Adjust path as needed
const facilities = require('./facilitySeeds');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Delete existing facilities
    await Facility.deleteMany({});
    console.log('Deleted existing facilities');

    // Insert new facilities
    const createdFacilities = await Facility.insertMany(facilities);
    console.log(`Successfully seeded ${createdFacilities.length} facilities`);

    // Log the created facilities
    createdFacilities.forEach(facility => {
      console.log(`Created facility: ${facility.name}`);
    });

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase(); 