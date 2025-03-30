import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  CircularProgress,
  Alert,
  CardMedia,
  Skeleton,
  useTheme,
  Paper,
  InputAdornment,
  IconButton,
  Rating,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { createBooking } from "../services/bookingService";
import { getAllFacilities, getFacilityById } from "../services/facilityService";
import {
  Search as SearchIcon,
  LocationOn,
  Storage,
  AccessTime,
  Star,
  StarBorder,
} from '@mui/icons-material';

const StorageFacilities = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState(1);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    storageType: '',
    quantity: '',
    startDate: '',
    endDate: '',
  });
  const [bookingError, setBookingError] = useState(null);

  const type = searchParams.get("type") || "all";

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const data = await getAllFacilities();
        setFacilities(data);
      } catch (err) {
        setError("Error loading facilities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const filteredFacilities = facilities.filter((facility) => {
    const matchesType = type === "all" || facility.type === type;
    const priceString = typeof facility.price === 'string' ? facility.price : facility.price.toString();
    const matchesSearch =
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      priceString.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.capacity.toString().includes(searchTerm);
    return matchesType && matchesSearch;
  });

  const sortedFacilities = [...filteredFacilities].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      case "price":
        const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9]/g, "")) : parseFloat(a.price);
        const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9]/g, "")) : parseFloat(b.price);
        return priceA - priceB;
      case "capacity":
        return parseFloat(b.capacity) - parseFloat(a.capacity);
      default:
        return 0;
    }
  });

  const handleBookClick = (facility) => {
    if (!user) return setLoginDialogOpen(true);
    if (!facility) {
      alert("Invalid facility selected");
      return;
    }
    // Reset form state
    setQuantity(1);
    setDuration(1);
    setPaymentMethod("");
    setSelectedFacility(facility);
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!user) return setLoginDialogOpen(true);
    if (!selectedFacility) {
      alert("No facility selected");
      return;
    }
    if (!paymentMethod) return alert("Please select a payment method");
    if (quantity < 1) return alert("Quantity must be at least 1");
    if (duration < 1) return alert("Duration must be at least 1");

    try {
      // Validate facility data
      if (!selectedFacility.price || !selectedFacility.name || !selectedFacility.location || !selectedFacility.type) {
        throw new Error("Invalid facility data");
      }

      // Calculate total amount based on facility price, quantity, and duration
      const pricePerTon = typeof selectedFacility.price === 'string' 
        ? parseInt(selectedFacility.price.replace(/[^0-9]/g, ""))
        : parseInt(selectedFacility.price);

      if (isNaN(pricePerTon)) {
        throw new Error("Invalid price format");
      }
      const totalAmount = pricePerTon * quantity * duration;

      // Check if quantity exceeds available slots
      if (quantity > selectedFacility.availableSlots) {
        alert(`Sorry, only ${selectedFacility.availableSlots} slots are available`);
        return;
      }

      // Get current date and time
      const now = new Date();
      
      // Format date as YYYY-MM-DD
      const date = now.toISOString().split('T')[0];
      
      // Format time as HH:mm:ss
      const bookingTime = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const bookingData = {
        facility: {
          name: selectedFacility.name,
          location: selectedFacility.location,
          type: selectedFacility.type,
        },
        quantity,
        duration,
        date, // This will be used for the pre-save validation
        paymentMethod: paymentMethod === "online" ? "online" : "cash",
        totalAmount,
        paymentStatus: paymentMethod === "online" ? "paid" : "pending",
        bookingDate: now, // This is the actual Date object for storage
        bookingTime,
        userId: user.id,
      };

      console.log('Creating booking with data:', bookingData);
      const booking = await createBooking(bookingData);
      
      if (!booking) {
        throw new Error("Failed to create booking");
      }

      if (paymentMethod === "online") {
        navigate("/payment", {
          state: {
            bookingDetails: booking,
            facility: selectedFacility,
          },
        });
      } else {
        navigate("/dashboard", {
          state: {
            message: "Booking created successfully! Please complete payment at the facility.",
            bookingDetails: booking,
            facility: selectedFacility,
          },
        });
      }
      setBookingDialogOpen(false);
    } catch (error) {
      console.error('Booking error:', error);
      alert(
        error.response?.data?.message ||
        error.message ||
        "Error creating booking. Please try again."
      );
    }
  };

  const FacilityCard = ({ facility }) => (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={facility.image || 'https://source.unsplash.com/random/400x300?warehouse'}
        alt={facility.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {facility.name}
          </Typography>
          <Chip 
            label={facility.type === "dry storage" ? "Dry Storage" : "Cold Storage"} 
            color={facility.type === "dry storage" ? "primary" : "secondary"}
            size="small"
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {facility.location}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Storage sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Capacity: {facility.capacity}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTime sx={{ fontSize: 20, color: 'text.secondary', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Operating Hours: {facility.operatingHours}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={facility.rating || 0}
            readOnly
            size="small"
            sx={{ mr: 1 }}
            emptyIcon={<StarBorder sx={{ color: 'text.secondary' }} />}
          />
          <Typography variant="body2" color="text.secondary">
            ({facility.reviewCount || 0} reviews)
          </Typography>
        </Box>

        <Typography variant="h6" color="primary" gutterBottom>
          ₹{facility.price}/day
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {facility.description}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            setSelectedFacility(facility);
            setBookingDialogOpen(true);
          }}
          disabled={!user}
        >
          {user ? 'Book Now' : 'Login to Book'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Storage Facilities
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search facilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="location">Location</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {loading ? (
          // Loading skeletons
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          filteredFacilities.map((facility) => (
            <Grid item xs={12} sm={6} md={4} key={facility._id}>
              <FacilityCard facility={facility} />
            </Grid>
          ))
        )}
      </Grid>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please login to book a storage facility.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => navigate('/login')} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog 
        open={bookingDialogOpen} 
        onClose={() => {
          setBookingDialogOpen(false);
          setSelectedFacility(null);
          setQuantity(1);
          setDuration(1);
          setPaymentMethod("");
        }} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>Book Storage Facility</DialogTitle>
        <DialogContent>
          {bookingError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {bookingError}
            </Alert>
          )}
          {selectedFacility ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">{selectedFacility.name}</Typography>
              <Typography>Location: {selectedFacility.location}</Typography>
              <Typography>Price: ₹{selectedFacility.price}/ton/month</Typography>
              <Typography>Available Slots: {selectedFacility.availableSlots}</Typography>
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Quantity (tons)"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    inputProps={{ min: 1, max: selectedFacility.availableSlots }}
                    helperText={`Max ${selectedFacility.availableSlots} slots available`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Duration (months)"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle1" gutterBottom>
                Total Amount: ₹{typeof selectedFacility.price === 'string' 
                  ? parseInt(selectedFacility.price.replace(/[^0-9]/g, "")) * quantity * duration
                  : selectedFacility.price * quantity * duration}
              </Typography>

              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Select Payment Method
              </Typography>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  value="online"
                  control={<Radio />}
                  label="Online Payment"
                />
                <FormControlLabel
                  value="offline"
                  control={<Radio />}
                  label="Pay at Facility"
                />
              </RadioGroup>
            </Box>
          ) : (
            <Typography color="error">No facility selected</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setBookingDialogOpen(false);
            setSelectedFacility(null);
            setQuantity(1);
            setDuration(1);
            setPaymentMethod("");
          }}>Cancel</Button>
          <Button 
            onClick={handleConfirmBooking} 
            color="primary" 
            variant="contained"
            disabled={!selectedFacility || !paymentMethod}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StorageFacilities;
