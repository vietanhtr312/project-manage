const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  due_date: { type: Date },
  status: { type: String, enum: ['not_started', 'in_progress', 'done'], default: 'not_started' },
  progress: { type: Number, default: 0 },
  estimated_hours: { type: Number },
  actual_hours: { type: Number }
});

module.exports = mongoose.model('Task', TaskSchema);