const mongoose = require('mongoose')

const connectDB = async(uri) => {
    mongoose.connect(uri).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err.message));
}

module.exports = connectDB;
