const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;

const mongoose = require("mongoose");
dotenv.config();
const queryString = process.env.MONGODB_URI || "mongodb+srv://hoangviet232003:sPly3jM7MVfga6fE@cluster0.5koqu2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(queryString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err.message));