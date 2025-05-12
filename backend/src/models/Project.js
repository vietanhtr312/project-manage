const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' }
});

module.exports = mongoose.model('Project', ProjectSchema);