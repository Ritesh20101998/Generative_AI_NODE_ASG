// vehicleController.js
const Vehicle = require('../models/VehicleSchema.model');
const ParkingHistory = require('../models/ParkingHistory.model');
const ParkingLot = require('../models/ParkingLot.model');
const nodemailer = require('nodemailer');
const emailConfig = require('../emailConfig');

require('dotenv').config();

// Create a Nodemailer transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

// Function to send an email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: emailConfig.user,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email not sent:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


// Park a vehicle
exports.parkVehicle = async (req, res, next) => {
  const { type, lotId } = req.body;
  try {
    const parkingLot = await ParkingLot.findById(lotId);
    if (!parkingLot) {
      return res.status(404).json({ error: 'Parking Lot not found' });
    }

    // Check if the parking lot has available space for the vehicle type
    if (parkingLot.capacity[type] <= 0) {
      return res.status(400).json({ error: 'Parking Lot is full for this vehicle type' });
    }

    // Deduct available space in the parking lot
    parkingLot.capacity[type]--;

    // Create a new vehicle entry
    const newVehicle = new Vehicle({ type });
    await newVehicle.save();

    // Update the parking lot
    await parkingLot.save();

    // Store the parking entry in the history
    const parkingHistory = new ParkingHistory({
      vehicle: newVehicle._id,
      lot: parkingLot._id,
      checkInTime: new Date(),
    });
    await parkingHistory.save();

    res.status(201).json({ message: 'Vehicle parked successfully' });
  } catch (error) {
    next(error);
  }
};

// Exit a vehicle and calculate charges
exports.exitVehicle = async (req, res, next) => {
  const vehicleId = req.params.id;
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check-out time
    const checkOutTime = new Date();

    // Find the parking history entry for the vehicle
    const parkingHistory = await ParkingHistory.findOne({ vehicle: vehicle._id, checkOutTime: null });

    if (!parkingHistory) {
      return res.status(400).json({ error: 'Vehicle is not parked in any parking lot' });
    }

    // Calculate the parking duration and charges
    const checkInTime = parkingHistory.checkInTime;
    const duration = (checkOutTime - checkInTime) / (1000 * 60 * 60); // Hours
    const parkingLot = await ParkingLot.findById(parkingHistory.lot);
    const hourlyRate = parkingLot.rateCard[vehicle.type];
    const amountPaid = duration * hourlyRate;

    // Update parking history entry
    parkingHistory.checkOutTime = checkOutTime;
    parkingHistory.amountPaid = amountPaid;
    await parkingHistory.save();

    // Increase available space in the parking lot
    parkingLot.capacity[vehicle.type]++;
    await parkingLot.save();

    res.json({ message: 'Vehicle exited successfully', amountPaid });
  } catch (error) {
    next(error);
  }
};

// Get parking history for a vehicle
exports.getParkingHistory = async (req, res, next) => {
  const vehicleId = req.params.id;
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const history = await ParkingHistory.find({ vehicle: vehicle._id }).populate('lot');
    res.json(history);
  } catch (error) {
    next(error);
  }
};