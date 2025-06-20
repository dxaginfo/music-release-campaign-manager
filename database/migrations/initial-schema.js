/**
 * Initial database schema migration script
 * 
 * This script creates the initial collections and indexes for the application.
 * It can be run manually or as part of an automated deployment process.
 * 
 * Usage: node database/migrations/initial-schema.js
 */

require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');

// Connection URI
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/music-release-manager';

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB successfully');
  
  try {
    // Create users collection with email index
    await mongoose.connection.db.createCollection('users');
    await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Created users collection with indexes');
    
    // Create teams collection
    await mongoose.connection.db.createCollection('teams');
    await mongoose.connection.db.collection('teams').createIndex({ owner: 1 });
    console.log('Created teams collection with indexes');
    
    // Create campaigns collection
    await mongoose.connection.db.createCollection('campaigns');
    await mongoose.connection.db.collection('campaigns').createIndex({ team: 1, status: 1 });
    await mongoose.connection.db.collection('campaigns').createIndex({ created_by: 1 });
    console.log('Created campaigns collection with indexes');
    
    // Create tasks collection
    await mongoose.connection.db.createCollection('tasks');
    await mongoose.connection.db.collection('tasks').createIndex({ campaign: 1 });
    await mongoose.connection.db.collection('tasks').createIndex({ assigned_to: 1 });
    console.log('Created tasks collection with indexes');
    
    // Create assets collection
    await mongoose.connection.db.createCollection('assets');
    await mongoose.connection.db.collection('assets').createIndex({ campaign: 1 });
    await mongoose.connection.db.collection('assets').createIndex({ type: 1 });
    await mongoose.connection.db.collection('assets').createIndex({ tags: 1 });
    console.log('Created assets collection with indexes');
    
    // Create marketing activities collection
    await mongoose.connection.db.createCollection('marketing_activities');
    await mongoose.connection.db.collection('marketing_activities').createIndex({ campaign: 1 });
    await mongoose.connection.db.collection('marketing_activities').createIndex({ scheduled_date: 1 });
    console.log('Created marketing_activities collection with indexes');
    
    // Create contacts collection
    await mongoose.connection.db.createCollection('contacts');
    await mongoose.connection.db.collection('contacts').createIndex({ team: 1 });
    await mongoose.connection.db.collection('contacts').createIndex({ type: 1 });
    console.log('Created contacts collection with indexes');
    
    // Create analytics collection
    await mongoose.connection.db.createCollection('analytics');
    await mongoose.connection.db.collection('analytics').createIndex({ campaign: 1, date: 1 });
    await mongoose.connection.db.collection('analytics').createIndex({ platform: 1 });
    console.log('Created analytics collection with indexes');
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
