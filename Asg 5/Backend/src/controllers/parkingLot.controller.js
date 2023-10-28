// controllers/parkingLotController.js
const ParkingLot = require('../models/ParkingLot.model');

// Controller function to create a new parking lot
exports.createParkingLot = (req, res, next) => {
  const { name, capacity, rateCard } = req.body;

  const newParkingLot = new ParkingLot({
    name,
    capacity,
    rateCard,
  });

  newParkingLot.save((err, lot) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(lot);
  });
};

// Controller function to update the rate card of a parking lot
exports.updateRateCard = (req, res, next) => {
  const { parkingLot } = req;
  const { rateCard } = req.body;

  parkingLot.rateCard = rateCard;

  parkingLot.save((err, updatedLot) => {
    if (err) {
      return next(err);
    }
    res.json(updatedLot);
  });
};
