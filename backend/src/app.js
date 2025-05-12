const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db')
const dotenv = require('dotenv');
dotenv.config();

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