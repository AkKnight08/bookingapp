import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Paper, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Welcome to Farm Storage Portal
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Your trusted partner in agricultural storage solutions. Book secure and reliable storage facilities for your produce.
              </Typography>
              <Button
                component={RouterLink}
                to="/storage-facilities"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Find Storage Facilities
              </Button>
            </Grid>
            
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Storage Types Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Choose Your Storage Type
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StorageIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5" component="h3">
                      Dry Storage
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Perfect for storing grains, pulses, and other dry agricultural produce.
                    Temperature-controlled environment to maintain quality.
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/storage-facilities?type=dry storage"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Dry Storage Facilities
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalShippingIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                    <Typography variant="h5" component="h3">
                      Cold Storage
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Ideal for storing fruits, vegetables, and other perishable items.
                    Maintains optimal temperature and humidity levels.
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/storage-facilities?type=cold storage"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    View Cold Storage Facilities
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Why Choose Our Storage Facilities?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>Secure Storage</Typography>
                <Typography variant="body2" color="text.secondary">
                  24/7 security and surveillance to protect your produce
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <LocalShippingIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>Convenient Location</Typography>
                <Typography variant="body2" color="text.secondary">
                  Find the nearest storage facility to your farm
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <StorageIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>Flexible Booking</Typography>
                <Typography variant="body2" color="text.secondary">
                  Book storage space as per your needs
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <SupportAgentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>24/7 Support</Typography>
                <Typography variant="body2" color="text.secondary">
                  Dedicated support team to assist you
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ 
            textAlign: 'center',
            py: 6,
            px: 4,
            bgcolor: 'grey.50',
            borderRadius: 2,
            mb: 8,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {user 
              ? "Browse our storage facilities and book your space today!"
              : "Create an account to start booking storage facilities."}
          </Typography>
          <Button
            component={RouterLink}
            to={user ? "/storage-facilities" : "/register"}
            variant="contained"
            size="large"
            color="primary"
          >
            {user ? "View Storage Facilities" : "Create Account"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 