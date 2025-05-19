const schedule = require('node-schedule')
const Task = require('../models/Task')
const notificationService = require('../services/notificationService');
const taskService = require('./taskService');

const startNotificationScheduler = () => {
    console.log('Starting notification scheduler....');
    const job = schedule.scheduleJob('0 9 * * *', async () => {
        console.log('Running scheduled Task reminder check:', new Date().toLocaleString());
        await checkUrgentTask();
    })
    return job;
}

const checkUrgentTask = async() => {
    try { 
        const now = new Date();
        const oneDayFromNow = new Date(now + 1);
        oneDayFromNow.setDate(now.getDate() + 1);
        const tasks = await Task.find({
            due_date: {
                $gte: now, 
                $lte: oneDayFromNow
            },
            status: 'IN_PROGRESS'
        });
        console.log(`Found ${tasks.length} tasks due in the next 24 hours`);
        for (const task of tasks) {
            receivers = await taskService.getTaskMembers(task._id);
            for (const receiver of receivers) {
                await notificationService.createNotification(
                    receiver._id, 
                    `Task "${task.title}" is due tomorrow on ${task.due_date.toDateString()}.`,
                    'REMINDER', 
                    `tasks/${task._id}`);
            }
        }
    }
    catch(error) {
        console.log(error.message);
    }
} 

module.exports = startNotificationScheduler;