import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  useTheme,
  Rating,
} from '@mui/material';
import {
  Storage,
  CalendarToday,
  LocationOn,
  AccessTime,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyBookings } from '../services/bookingService';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const BookingCard = ({ booking }) => (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {booking.facility.name}
          </Typography>
          <Chip 
            label={booking.status} 
            color={booking.status === 'active' ? 'success' : 'default'}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Storage sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {booking.storageType}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {booking.facility.location}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarToday sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTime sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Quantity: {booking.quantity} tons
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={booking.facility.rating || 0}
            readOnly
            size="small"
            sx={{ mr: 1 }}
            emptyIcon={<StarBorder sx={{ color: 'text.secondary' }} />}
          />
          <Typography variant="body2" color="text.secondary">
            ({booking.facility.reviewCount || 0} reviews)
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ₹{booking.totalAmount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your storage facility bookings and view your account information
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Active Bookings
            </Typography>
            <Typography variant="h3" color="primary">
              {bookings.filter(b => b.status === 'active').length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Bookings
            </Typography>
            <Typography variant="h3" color="primary">
              {bookings.length}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Total Spent
            </Typography>
            <Typography variant="h3" color="primary">
              ₹{bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)}
            </Typography>
          </Paper>
        </Grid>

        {/* Bookings Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              Your Bookings
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/storage-facilities')}
            >
              Book New Storage
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : bookings.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                You haven't made any bookings yet.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/storage-facilities')}
                sx={{ mt: 2 }}
              >
                Browse Storage Facilities
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {bookings.map((booking) => (
                <Grid item xs={12} md={6} key={booking._id}>
                  <BookingCard booking={booking} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 