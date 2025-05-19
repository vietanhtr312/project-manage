const schedule = require('node-schedule')
const Task = require('../models/Task')
const notificationService = require('./notificationService');
const taskService = require('./taskService');
const taskMemberService = require('./taskMemberService');

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
        const tasks = await taskService.getTasksDueIn(1);
        for (const task of tasks) {
            receivers = await taskMemberService.getTaskMembers(task._id);
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