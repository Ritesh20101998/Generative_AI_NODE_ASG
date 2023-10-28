const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.PORT; // You can choose any port you like


// Connect to MongoDB
const connection = require("./config/config");

// Include the parking lot routes
const parkingLotRoutes = require('./src/routes/ParkingLot.routes');
app.use('/api', parkingLotRoutes);

// Body parsing middleware
app.use(express.json());

// Define your routes here

app.listen(port, async(req,res) => {
    try{
        await connection
    } catch(err){
        console.log(err.message)
    }
    console.log(`Server is running on port ${port}`);
});
