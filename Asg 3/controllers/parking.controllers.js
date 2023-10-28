const Car = require('../models/cars.models');
require('dotenv').config()

async function findAvailableSlot() {
    const totalSlots = process.env.PARKING_LOT_SIZE;
  
    // Find the total number of occupied slots
    const occupiedSlots = await Car.countDocuments();
  
    // Check if the parking lot is already full
    if (occupiedSlots >= totalSlots) {
      return null; // No available slots
    }
  
    // Find the lowest available slot number
    for (let slotNumber = 1; slotNumber <= totalSlots; slotNumber++) {
      const car = await Car.findOne({ slotNumber });
  
      if (!car) {
        return slotNumber; // Found an available slot
      }
    }
  
    // This point should not be reached since the parking lot isn't full, but just in case
    return null;
}
  
exports.parkCar = async (req, res) => {
    try {
      // Check if the parking lot is full
      const totalSlots = process.env.PARKING_LOT_SIZE;
      const occupiedSlots = await Car.countDocuments();
      
      if (occupiedSlots >= totalSlots) {
        return res.status(400).json({ error: 'Parking lot is full.' });
      }
  
      const carNumber = req.body.carNumber;
      
      // Find an available slot using the findAvailableSlot function
      const slotNumber = await findAvailableSlot();
      
      if (slotNumber === null) {
        return res.status(400).json({ error: 'No available slots.' });
      }
  
      // Create a new car record
      const car = new Car({
        carNumber,
        slotNumber,
      });
  
      // Save the car record in the database
      await car.save();
  
      return res.send({"message":`Car parked successfully on slotNumber ${slotNumber}`})
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

exports.unparkCar = async (req, res) => {
    try {
        const slotNumber = req.params.slotNumber;
    
        // Check if the slot is valid
        if (isNaN(slotNumber)) {
          return res.status(400).json({ error: 'Invalid slot number.' });
        }
    
        // Find and remove the car record by the slot number
        const car = await Car.findOneAndDelete({ slotNumber });
    
        if (!car) {
          return res.status(404).json({ error: 'Car not found in the specified slot.' });
        }
    
        return res.status(200).json({ message: 'Car successfully unparked.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCarOrSlotInfo = async (req, res) => {
    try {
        const query = req.params.query;

    if (query) {
        // Check if the query is a number (slot number) or a string (car number)
        if (!isNaN(query)) {
            // Query by slot number
            const car = await Car.findOne({ slotNumber: query });
            if (car) {
            return res.status(200).json({ carNumber: car.carNumber, slotNumber: car.slotNumber });
            } else {
            return res.status(404).json({ error: 'Car not found in the specified slot.' });
            }
        } else {
            // Query by car number
            const car = await Car.findOne({ carNumber: query });
            if (car) {
            return res.status(200).json({ carNumber: car.carNumber, slotNumber: car.slotNumber });
            } else {
            return res.status(404).json({ error: 'Car not found with the specified number.' });
            }
        }
    } else {
      return res.status(400).json({ error: 'Invalid query parameter.' });
    }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllParkingData = async (req, res) => {
    try {
      const parkingData = await Car.find();

      const emptyslots = process.env.PARKING_LOT_SIZE - parkingData.length

      res.status(200).json({ parkingData, "emptySlots" : emptyslots });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};
