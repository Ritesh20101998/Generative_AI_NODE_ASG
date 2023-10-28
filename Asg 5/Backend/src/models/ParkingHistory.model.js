const mongoose = require('mongoose');

const parkingHistorySchema = new mongoose.Schema({
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
    },
    lot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ParkingLot',
    },
    checkInTime: Date,
    checkOutTime: Date,
    amountPaid: Number,
},{
  versionKey:false
});

module.exports = mongoose.model('ParkingHistory', parkingHistorySchema);
