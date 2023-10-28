const express = require('express');
const parkingRouter = express.Router();
const parkingController = require('../controllers/parking.controllers');

parkingRouter.get("/", (req,res)=>{
    res.send("Welcome to DJ Parking Lines")
})

// Park a car
parkingRouter.post('/park', parkingController.parkCar);

// Unpark a car
parkingRouter.delete('/unpark/:slotNumber', parkingController.unparkCar);

// Get car/slot information
parkingRouter.get('/info/:query', parkingController.getCarOrSlotInfo);

parkingRouter.get('/all', parkingController.getAllParkingData);

module.exports = parkingRouter;
