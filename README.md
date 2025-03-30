# Storage Facility Booking App

A full-stack web application for booking storage facilities. Built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Browse storage facilities
- Book storage units
- View booking history
- Manage bookings (cancel/modify)
- Responsive design

## Tech Stack

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/storage-booking-app.git
cd storage-booking-app
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
   - Create `.env` file in the backend directory:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=8000
   ```
   - Create `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
cd frontend
npm start
```

The application will be available at `http://localhost:3000` 