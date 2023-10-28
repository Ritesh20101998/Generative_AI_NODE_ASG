const ParkingLot = require('../models/ParkingLot.model');

// Middleware to validate and load parking lot by ID
exports.loadParkingLot = (req, res, next, id) => {
  ParkingLot.findById(id, (err, lot) => {
    if (err) {
      return next(err);
    }
    if (!lot) {
      return res.status(404).json({ error: 'Parking lot not found' });
    }
    req.parkingLot = lot;
    return next();
  });
};
