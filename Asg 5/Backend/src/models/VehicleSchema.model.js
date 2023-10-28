const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: String, // Two-Wheeler, Hatchback, SUV, etc.
    // Add fields for vehicle details.
},{
  versionKey:false
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
