import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FARM STORAGE
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: 'white' }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/storage-facilities"
              sx={{ color: 'white' }}
            >
              Storage Facilities
            </Button>
            {user && (
              <Button
                component={RouterLink}
                to="/dashboard"
                sx={{ color: 'white' }}
              >
                Dashboard
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {!user ? (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'white' }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  sx={{ color: 'white' }}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                  Welcome, {user.name}
                </Typography>
                <Button
                  onClick={handleLogout}
                  sx={{ color: 'white' }}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 