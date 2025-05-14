const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db')
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require("./middlewares/errorHandler");
const app = express();

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
app.use('/api/v1/auth', authRoutes)
const taskRoutes = require('./routes/taskRoutes');

app.use('/api', taskRoutes);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
//Error Handling
app.use(errorHandler)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
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