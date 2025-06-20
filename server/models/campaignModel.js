const mongoose = require('mongoose');

const timelinePhaseSchema = new mongoose.Schema({
  phase: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
}, { _id: true });

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Campaign title is required'],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true,
  },
  release_type: {
    type: String,
    enum: ['single', 'EP', 'album'],
    required: [true, 'Release type is required'],
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: [true, 'Team is required'],
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'completed'],
    default: 'planning',
  },
  release_date: {
    type: Date,
    required: [true, 'Release date is required'],
  },
  timeline: [timelinePhaseSchema],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// Create index for faster querying
campaignSchema.index({ team: 1, status: 1 });
campaignSchema.index({ created_by: 1 });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
