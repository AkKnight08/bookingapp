const mongoose = require('mongoose');
const path = require('path');
const Facility = require('../models/Facility');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log('Starting facility seeding process...');
console.log('MongoDB URI:', process.env.MONGO_URI);

const facilities = [
  {
    name: 'Green Valley Storage',
    description: 'Modern dry storage facility with temperature control',
    type: 'dry storage',
    capacity: 1000,
    availableSlots: 5,
    location: 'Vesu, Surat',
    price: 100,
    image: '/images/dry-storage.jpg',
    amenities: ['Temperature Control', '24/7 Security', 'Loading Dock']
  },
  {
    name: 'Cold Storage Plus',
    description: 'State-of-the-art cold storage facility',
    type: 'cold storage',
    capacity: 500,
    availableSlots: 3,
    location: 'Katargam, Surat',
    price: 150,
    image: '/images/cold-storage.jpg',
    amenities: ['Temperature Control', 'Humidity Control', '24/7 Security']
  },
  {
    name: 'Surat Storage Hub',
    description: 'Large-scale storage facility with multiple options',
    type: 'dry storage',
    capacity: 2000,
    availableSlots: 8,
    location: 'Adajan, Surat',
    price: 120,
    image: '/images/storage-hub.jpg',
    amenities: ['Temperature Control', '24/7 Security', 'Loading Dock', 'Forklift Service']
  },
  {
    name: 'Frozen Foods Storage',
    description: 'Specialized cold storage for frozen foods',
    type: 'cold storage',
    capacity: 800,
    availableSlots: 4,
    location: 'Varachha, Surat',
    price: 180,
    image: '/images/frozen-storage.jpg',
    amenities: ['Temperature Control', 'Humidity Control', '24/7 Security', 'Loading Dock']
  },
  {
    name: 'Smart Storage Solutions',
    description: 'Modern facility with IoT monitoring and automation',
    type: 'dry storage',
    capacity: 1500,
    availableSlots: 6,
    location: 'Athwa, Surat',
    price: 140,
    image: '/images/smart-storage.jpg',
    amenities: ['IoT Monitoring', 'Automated Access', '24/7 Security', 'Climate Control']
  },
  {
    name: 'Rural Storage Center',
    description: 'Affordable storage solution for small-scale farmers',
    type: 'dry storage',
    capacity: 750,
    availableSlots: 5,
    location: 'Bhatar, Surat',
    price: 90,
    image: '/images/rural-storage.jpg',
    amenities: ['Basic Security', 'Loading Area', 'Pest Control']
  },
  {
    name: 'Premium Cold Storage',
    description: 'High-end cold storage with multiple temperature zones',
    type: 'cold storage',
    capacity: 1200,
    availableSlots: 4,
    location: 'Vesu, Surat',
    price: 200,
    image: '/images/premium-cold.jpg',
    amenities: ['Multiple Temperature Zones', 'Humidity Control', '24/7 Security', 'Loading Dock', 'Forklift Service']
  },
  {
    name: 'Industrial Storage Complex',
    description: 'Large industrial storage facility with multiple units',
    type: 'dry storage',
    capacity: 3000,
    availableSlots: 10,
    location: 'Sachin, Surat',
    price: 160,
    image: '/images/industrial-storage.jpg',
    amenities: ['Multiple Loading Bays', 'Forklift Service', '24/7 Security', 'Climate Control', 'Inventory Management']
  },
  {
    name: 'Fresh Produce Hub',
    description: 'Specialized storage for fruits and vegetables',
    type: 'cold storage',
    capacity: 600,
    availableSlots: 3,
    location: 'Katargam, Surat',
    price: 170,
    image: '/images/produce-storage.jpg',
    amenities: ['Temperature Control', 'Humidity Control', '24/7 Security', 'Loading Dock', 'Ventilation System']
  },
  {
    name: 'Cooperative Storage Center',
    description: 'Community storage facility with modern amenities',
    type: 'dry storage',
    capacity: 900,
    availableSlots: 6,
    location: 'Adajan, Surat',
    price: 110,
    image: '/images/coop-storage.jpg',
    amenities: ['Temperature Control', '24/7 Security', 'Loading Dock', 'Community Space']
  },
  {
    name: 'Mega Storage Complex',
    description: 'Largest storage facility in Surat with advanced features',
    type: 'dry storage',
    capacity: 5000,
    availableSlots: 15,
    location: 'Sachin, Surat',
    price: 180,
    image: '/images/mega-storage.jpg',
    amenities: ['Multiple Warehouses', 'Advanced Security', 'Loading Docks', 'Forklift Service', 'Inventory Management', 'Climate Control']
  },
  {
    name: 'Smart Cold Storage',
    description: 'IoT-enabled cold storage with real-time monitoring',
    type: 'cold storage',
    capacity: 1000,
    availableSlots: 5,
    location: 'Vesu, Surat',
    price: 220,
    image: '/images/smart-cold.jpg',
    amenities: ['IoT Monitoring', 'Temperature Control', 'Humidity Control', '24/7 Security', 'Automated Access']
  },
  {
    name: 'Farmers Market Storage',
    description: 'Storage facility near the farmers market',
    type: 'dry storage',
    capacity: 800,
    availableSlots: 4,
    location: 'Bhatar, Surat',
    price: 95,
    image: '/images/farmers-market.jpg',
    amenities: ['Basic Security', 'Loading Area', 'Pest Control', 'Market Access']
  },
  {
    name: 'Port Storage Facility',
    description: 'Storage facility near the port area',
    type: 'dry storage',
    capacity: 2500,
    availableSlots: 8,
    location: 'Hazira, Surat',
    price: 190,
    image: '/images/port-storage.jpg',
    amenities: ['Port Access', 'Multiple Loading Bays', '24/7 Security', 'Climate Control', 'Forklift Service']
  },
  {
    name: 'Textile Storage Hub',
    description: 'Specialized storage for textile materials',
    type: 'dry storage',
    capacity: 1800,
    availableSlots: 7,
    location: 'Katargam, Surat',
    price: 130,
    image: '/images/textile-storage.jpg',
    amenities: ['Humidity Control', '24/7 Security', 'Loading Dock', 'Textile Care']
  }
];

console.log(`Prepared ${facilities.length} facilities to seed`);

const seedFacilities = async () => {
  try {
    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing facilities
    console.log('Clearing existing facilities...');
    await Facility.deleteMany({});
    console.log('Cleared existing facilities successfully');
    
    // Insert new facilities
    console.log('Inserting new facilities...');
    const insertedFacilities = await Facility.insertMany(facilities);
    console.log(`Successfully inserted ${insertedFacilities.length} facilities`);
    console.log('First facility:', insertedFacilities[0]);
  } catch (error) {
    console.error('Error seeding facilities:', error);
    console.error('Full error stack:', error.stack);
  } finally {
    // Close the connection
    console.log('Closing database connection...');
    await mongoose.connection.close();
    console.log('Database connection closed successfully');
  }
};

// Execute the seed function
console.log('Executing seed function...');
seedFacilities();

module.exports = seedFacilities; 