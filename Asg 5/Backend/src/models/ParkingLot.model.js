const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
  name: String,
  capacity: {
    twoWheelers: Number,
    hatchbackCars: Number,
    suvCars: Number,
  },
  rateCard: {
    twoWheelers: Number,
    hatchbackCars: Number,
    suvCars: Number,
  }
},{
  versionKey:false
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);
