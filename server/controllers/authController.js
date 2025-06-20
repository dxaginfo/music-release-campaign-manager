const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('../middleware/asyncHandler');
const { CustomError } = require('../utils/errorUtils');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, role, company } = req.body;
  
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new CustomError('User already exists', 400);
  }
  
  // Create new user
  const user = await User.create({
    email,
    password,
    name,
    role: role || 'team_member',
    company,
  });
  
  if (user) {
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        avatar: user.avatar,
      },
      token,
    });
  } else {
    throw new CustomError('Invalid user data', 400);
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = await User.findOne({ email });
  
  if (user && (await user.comparePassword(password))) {
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        avatar: user.avatar,
      },
      token,
    });
  } else {
    throw new CustomError('Invalid email or password', 401);
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/status
// @access  Private
const getUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      avatar: user.avatar,
    });
  } else {
    throw new CustomError('User not found', 404);
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserStatus,
};
