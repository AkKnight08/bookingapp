import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Facilities = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Available Facilities
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Browse and book from our selection of facilities
        </Typography>
      </Box>
    </Container>
  );
};

export default Facilities; 