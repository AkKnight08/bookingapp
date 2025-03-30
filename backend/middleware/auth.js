const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Auth middleware called');
  console.log('Headers:', req.headers);

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token received:', token ? 'Yes' : 'No');

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully');
    console.log('Decoded token:', JSON.stringify(decoded, null, 2));

    // Extract user ID from the decoded token
    const userId = decoded.userId || decoded.id;
    console.log('User ID from token:', userId);

    if (!userId) {
      console.log('No user ID found in token');
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Add user ID to request object
    req.user = { userId };
    console.log('Added user to request:', req.user);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    console.error('Error stack:', error.stack);
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
}; 