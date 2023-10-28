const express = require('express');
const parkingRouter = express.Router();
const parkingLotController = require("../controllers/parkingLot.controller");
const parkingLotMiddleware = require("../middleware/ParkingLot.middleware")

//validation 
parkingRouter.param("/lotId",parkingLotMiddleware.loadParkingLot)

//create parking
parkingRouter.post('/parking-lots', parkingLotController.createParkingLot);

//update parking
parkingRouter.put('/parking-lots/:lotId', parkingLotController.updateRateCard);


module.exports = parkingRouter;
