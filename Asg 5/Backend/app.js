const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.PORT; // You can choose any port you like


// Connect to MongoDB
const connection = require("./config/config");

// Include the parking lot routes
const parkingLotRoutes = require('./src/routes/ParkingLot.routes');


//connect to middleware
const errorMiddleware = require("./src/middleware/error.middleware")

// Body parsing middleware
app.use(express.json());
app.use('/api', parkingLotRoutes);

// Use error handling middleware
app.use(errorMiddleware.handleError);


// Define your routes here
app.get("/",(req,res)=>{
    res.send("Welcome to Parking System..")
})

app.listen(port, async(req,res) => {
    try{
        await connection
        console.log("DB Connected")
    } catch(err){
        console.log("DB not Connected..")
        console.log(err.message)
    }
    console.log(`Server is running on port ${port}`);
});
