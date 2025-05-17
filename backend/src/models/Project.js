const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    maxlength: 50
  },
  start_date: {
    type: Date,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
}, { timestamps: true });


module.exports = mongoose.model('Project', ProjectSchema);