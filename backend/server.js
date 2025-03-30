const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// ✅ CORS Configuration - Allows frontend to send cookies
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with frontend URL
    credentials: true, // Allows cookies to be sent
  })
);

// ✅ Middleware
app.use(express.json()); // Built-in body parser (no need for `body-parser`)
app.use(cookieParser()); // ✅ Required for JWT in cookies

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Server Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
