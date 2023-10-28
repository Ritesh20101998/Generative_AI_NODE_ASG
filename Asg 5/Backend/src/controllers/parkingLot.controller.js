// controllers/parkingLotController.js
const ParkingLot = require('../models/ParkingLot.model');

// Get all parking lots
exports.getAllParkingLots = async (req, res, next) => {
  try {
    const parkingLots = await ParkingLot.find();
    res.json(parkingLots);
  } catch (error) {
    next(error);
  }
};

// Get a parking lot by ID
exports.getParkingLotById = async (req, res, next) => {
  const parkingLotId = req.params.id;
  try {
    const parkingLot = await ParkingLot.findById(parkingLotId);
    if (!parkingLot) {
      return res.status(404).json({ error: 'Parking Lot not found' });
    }
    res.json(parkingLot);
  } catch (error) {
    next(error);
  }
};

// Create a new parking lot
exports.createParkingLot = async (req, res, next) => {
  const { name, capacity, rateCard } = req.body;
  try {
    const newParkingLot = new ParkingLot({ name, capacity, rateCard });
    await newParkingLot.save();
    res.status(201).json(newParkingLot);
  } catch (error) {
    next(error);
  }
};

// Update a parking lot by ID
exports.updateParkingLot = async (req, res, next) => {
  const parkingLotId = req.params.id;
  const { name, capacity, rateCard } = req.body;
  try {
    const parkingLot = await ParkingLot.findById(parkingLotId);
    if (!parkingLot) {
      return res.status(404).json({ error: 'Parking Lot not found' });
    }

    // Update parking lot details
    parkingLot.name = name;
    parkingLot.capacity = capacity;
    parkingLot.rateCard = rateCard;

    // Save the updated parking lot
    await parkingLot.save();

    res.json(parkingLot);
  } catch (error) {
    next(error);
  }
};

// Delete a parking lot by ID
exports.deleteParkingLot = async (req, res, next) => {
  const parkingLotId = req.params.id;
  try {
    const parkingLot = await ParkingLot.findById(parkingLotId);
    if (!parkingLot) {
      return res.status(404).json({ error: 'Parking Lot not found' });
    }

    // Delete the parking lot
    await parkingLot.remove();

    res.json({ message: 'Parking Lot deleted successfully' });
  } catch (error) {
    next(error);
  }
};

