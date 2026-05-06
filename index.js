const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load env vars
dotenv.config();

//Connect to database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);  
    }
};
connectDB();

const app= express();
app.use(express.json()); //Body parser
app.use(cors()); //Enable CORS

// Mount routers
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('api/staffs', require('./routes/staffRoute'));
// app.use('/api/products', require('./routes/productRoutes'));


//Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Server Error' });
});

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server runnning on port ${PORT}`);
});



