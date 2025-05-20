const mongoose = require('mongoose');

const TaskStatus = {
	TO_DO: 'to-do',
	IN_PROGRESS: 'in-progress',
	DONE: 'done'
}

const TaskSchema = new mongoose.Schema({
	module: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Module',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	start_date: {
		type: Date
	},
	due_date: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		enum: Object.values(TaskStatus),
		default: TaskStatus.TO_DO
	},
	progress: {
		type: String,
	}
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema)