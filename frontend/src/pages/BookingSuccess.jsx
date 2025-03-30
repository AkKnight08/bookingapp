import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Divider,
} from '@mui/material';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;
  const facility = location.state?.facility;

  if (!bookingDetails || !facility) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            No booking details found. Please try booking again.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/storage-facilities')}
            sx={{ mt: 2 }}
          >
            Go to Storage Facilities
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="success.main">
          ✓ Booking Successful!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Thank you for choosing our storage facility. Your booking has been confirmed.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Facility:</Typography>
              <Typography>{facility.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Location:</Typography>
              <Typography>{facility.location}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Quantity:</Typography>
              <Typography>{bookingDetails.quantity} tons</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Duration:</Typography>
              <Typography>{bookingDetails.duration} months</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Date:</Typography>
              <Typography>{bookingDetails.date}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Payment Method:</Typography>
              <Typography>Online Payment</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" color="primary">
                Total Amount Paid: ₹{bookingDetails.totalAmount}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/storage-facilities')}
          sx={{ mr: 2 }}
        >
          Book Another Storage
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default BookingSuccess; 