const express = require('express');
const ParkingRouter = express.Router();

const parkingLotController = require('../controllers/parkingLot.controller');

const vehicleController = require('../controllers/vehicle.controller');

const feedbackController = require('../controllers/feeback.controller');

// Define your routes here
ParkingRouter.get("/",(req,res)=>{
    res.send("Welcome to Parking Routes System..")
})

// Routes for managing parking lots
ParkingRouter.get('/parking-lots', parkingLotController.getAllParkingLots);

ParkingRouter.get('/parking-lots/:id', parkingLotController.getParkingLotById);

ParkingRouter.post('/parking-lots', parkingLotController.createParkingLot);

ParkingRouter.put('/parking-lots/:id', parkingLotController.updateParkingLot);

ParkingRouter.delete('/parking-lots/:id', parkingLotController.deleteParkingLot);

// Routes for managing vehicles
ParkingRouter.post('/vehicles', vehicleController.parkVehicle);

ParkingRouter.put('/vehicles/:id/exit', vehicleController.exitVehicle);

ParkingRouter.get('/vehicles/:id/history', vehicleController.getParkingHistory);

ParkingRouter.post('/feedback', feedbackController.submitFeedback);

module.exports = ParkingRouter;
