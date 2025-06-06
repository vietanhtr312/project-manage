const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db')
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const startNotificationScheduler = require('./services/notificationSchedule');
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const moduleRoutes = require('./routes/moduleRoutes');
const taskMemberRoutes = require('./routes/taskMemberRoutes');

//Middlewares
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test
app.get("/", (req, res) => { 
    res.send("Hello")
});


//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/modules', moduleRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/taskmembers', taskMemberRoutes);

//Error Handling
app.use(errorHandler)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        startNotificationScheduler();
        const port = process.env.PORT;
        app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`);
        })
    } catch(error) {
        console.error('Failed to start the server:', error);
    }
};


start()

module.exports = app;