const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const StorageFacility = require('./models/StorageFacility');
const Booking = require('./models/Booking');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await StorageFacility.deleteMany({});
    await Booking.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        phone: '1234567890',
        address: '123 Main St, City',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        phone: '9876543210',
        address: '456 Oak Ave, Town',
        role: 'user',
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        phone: '5555555555',
        address: '789 Admin Blvd, City',
        role: 'admin',
      },
      {
        name: 'Robert Wilson',
        email: 'robert@example.com',
        password: hashedPassword,
        phone: '1112223333',
        address: '321 Pine St, Village',
        role: 'user',
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: hashedPassword,
        phone: '4445556666',
        address: '654 Maple Dr, Town',
        role: 'user',
      },
      {
        name: 'Michael Brown',
        email: 'michael@example.com',
        password: hashedPassword,
        phone: '7778889999',
        address: '987 Cedar Ln, City',
        role: 'user',
      },
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        password: hashedPassword,
        phone: '2223334444',
        address: '456 Birch Rd, Town',
        role: 'user',
      },
      {
        name: 'David Lee',
        email: 'david@example.com',
        password: hashedPassword,
        phone: '6667778888',
        address: '789 Elm St, Village',
        role: 'user',
      }
    ]);
    console.log('Created sample users');

    // Create sample storage facilities
    const facilities = await StorageFacility.insertMany([
      {
        name: 'Agro Storage Hub',
        location: 'Mumbai, Maharashtra',
        type: 'dry storage',
        capacity: 1000,
        price: 500,
        description: 'Modern dry storage facility with temperature control and pest management.',
        availableSlots: 5,
        operatingHours: '24/7',
        rating: 4.5,
        reviewCount: 128,
        image: 'https://source.unsplash.com/random/400x300?warehouse',
      },
      {
        name: 'Cold Chain Solutions',
        location: 'Delhi, NCR',
        type: 'cold storage',
        capacity: 800,
        price: 800,
        description: 'State-of-the-art cold storage facility with advanced refrigeration systems.',
        availableSlots: 3,
        operatingHours: '24/7',
        rating: 4.8,
        reviewCount: 95,
        image: 'https://source.unsplash.com/random/400x300?cold-storage',
      },
      {
        name: 'Rural Storage Center',
        location: 'Pune, Maharashtra',
        type: 'dry storage',
        capacity: 500,
        price: 300,
        description: 'Affordable storage solution for small-scale farmers.',
        availableSlots: 8,
        operatingHours: '6 AM - 10 PM',
        rating: 4.2,
        reviewCount: 75,
        image: 'https://source.unsplash.com/random/400x300?rural-warehouse',
      },
      {
        name: 'Premium Cold Storage',
        location: 'Bangalore, Karnataka',
        type: 'cold storage',
        capacity: 1200,
        price: 1000,
        description: 'Premium cold storage facility with multiple temperature zones.',
        availableSlots: 2,
        operatingHours: '24/7',
        rating: 4.9,
        reviewCount: 156,
        image: 'https://source.unsplash.com/random/400x300?premium-storage',
      },
      {
        name: 'Farmers Storage Co-op',
        location: 'Hyderabad, Telangana',
        type: 'dry storage',
        capacity: 750,
        price: 400,
        description: 'Cooperative storage facility with modern amenities.',
        availableSlots: 6,
        operatingHours: '24/7',
        rating: 4.3,
        reviewCount: 89,
        image: 'https://source.unsplash.com/random/400x300?cooperative-warehouse',
      },
      {
        name: 'Fresh Produce Storage',
        location: 'Chennai, Tamil Nadu',
        type: 'cold storage',
        capacity: 600,
        price: 700,
        description: 'Specialized cold storage for fruits and vegetables.',
        availableSlots: 4,
        operatingHours: '24/7',
        rating: 4.6,
        reviewCount: 112,
        image: 'https://source.unsplash.com/random/400x300?produce-storage',
      },
      {
        name: 'Smart Storage Solutions',
        location: 'Kolkata, West Bengal',
        type: 'dry storage',
        capacity: 1500,
        price: 600,
        description: 'Smart storage facility with IoT monitoring and automation.',
        availableSlots: 7,
        operatingHours: '24/7',
        rating: 4.7,
        reviewCount: 143,
        image: 'https://source.unsplash.com/random/400x300?smart-warehouse',
      },
      {
        name: 'Frozen Foods Hub',
        location: 'Ahmedabad, Gujarat',
        type: 'cold storage',
        capacity: 900,
        price: 900,
        description: 'Specialized facility for frozen food storage with temperature monitoring.',
        availableSlots: 3,
        operatingHours: '24/7',
        rating: 4.4,
        reviewCount: 98,
        image: 'https://source.unsplash.com/random/400x300?frozen-storage',
      }
    ]);
    console.log('Created sample storage facilities');

    // Create sample bookings
    const bookings = await Booking.insertMany([
      {
        user: users[0]._id,
        facility: facilities[0]._id,
        storageType: 'dry storage',
        quantity: 100,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-06-01'),
        totalAmount: 15000,
        status: 'active',
        paymentStatus: 'paid',
      },
      {
        user: users[1]._id,
        facility: facilities[1]._id,
        storageType: 'cold storage',
        quantity: 50,
        startDate: new Date('2024-03-15'),
        endDate: new Date('2024-04-15'),
        totalAmount: 12000,
        status: 'active',
        paymentStatus: 'paid',
      },
      {
        user: users[3]._id,
        facility: facilities[2]._id,
        storageType: 'dry storage',
        quantity: 75,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-07-01'),
        totalAmount: 6750,
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        user: users[4]._id,
        facility: facilities[3]._id,
        storageType: 'cold storage',
        quantity: 200,
        startDate: new Date('2024-03-10'),
        endDate: new Date('2024-06-10'),
        totalAmount: 60000,
        status: 'active',
        paymentStatus: 'paid',
      },
      {
        user: users[0]._id,
        facility: facilities[4]._id,
        storageType: 'dry storage',
        quantity: 150,
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-08-01'),
        totalAmount: 18000,
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        user: users[1]._id,
        facility: facilities[5]._id,
        storageType: 'cold storage',
        quantity: 80,
        startDate: new Date('2024-03-20'),
        endDate: new Date('2024-04-20'),
        totalAmount: 16800,
        status: 'active',
        paymentStatus: 'paid',
      },
      {
        user: users[5]._id,
        facility: facilities[6]._id,
        storageType: 'dry storage',
        quantity: 120,
        startDate: new Date('2024-04-15'),
        endDate: new Date('2024-07-15'),
        totalAmount: 21600,
        status: 'active',
        paymentStatus: 'paid',
      },
      {
        user: users[6]._id,
        facility: facilities[7]._id,
        storageType: 'cold storage',
        quantity: 60,
        startDate: new Date('2024-03-25'),
        endDate: new Date('2024-04-25'),
        totalAmount: 16200,
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        user: users[7]._id,
        facility: facilities[0]._id,
        storageType: 'dry storage',
        quantity: 90,
        startDate: new Date('2024-05-10'),
        endDate: new Date('2024-08-10'),
        totalAmount: 13500,
        status: 'pending',
        paymentStatus: 'pending',
      },
      {
        user: users[5]._id,
        facility: facilities[1]._id,
        storageType: 'cold storage',
        quantity: 70,
        startDate: new Date('2024-04-20'),
        endDate: new Date('2024-05-20'),
        totalAmount: 16800,
        status: 'active',
        paymentStatus: 'paid',
      }
    ]);
    console.log('Created sample bookings');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
