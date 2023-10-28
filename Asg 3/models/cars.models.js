const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carNumber: {
    type: Number,
    required: true,
  },
  slotNumber: {
    type: Number,
    required: true,
  },
},{
  versionKey : false
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
