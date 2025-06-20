const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/userModel');
const { CustomError } = require('../utils/errorUtils');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      throw new CustomError('Not authorized, token failed', 401);
    }
  }
  
  if (!token) {
    throw new CustomError('Not authorized, no token', 401);
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    throw new CustomError('Not authorized as admin', 403);
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError(`Role (${req.user.role}) is not authorized to access this resource`, 403);
    }
    next();
  };
};

module.exports = { protect, admin, authorize };
