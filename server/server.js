require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');
const setupSwagger = require('./config/swagger');
const { errorHandler } = require('./middleware/errorMiddleware');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const assetRoutes = require('./routes/assetRoutes');
const teamRoutes = require('./routes/teamRoutes');
const taskRoutes = require('./routes/taskRoutes');
const marketingRoutes = require('./routes/marketingRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
setupSwagger(app);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing
