const validateFacility = (req, res, next) => {
  const { name, price, capacity } = req.body;
  
  if (!name || !price || !capacity) {
    return res.status(400).json({
      message: 'Missing required fields'
    });
  }

  if (price < 0) {
    return res.status(400).json({
      message: 'Price must be positive'
    });
  }

  if (capacity < 1) {
    return res.status(400).json({
      message: 'Capacity must be at least 1'
    });
  }

  next();
};

module.exports = validateFacility; 