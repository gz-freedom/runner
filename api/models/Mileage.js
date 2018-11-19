const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Mileage
let Mileage = new Schema({
  mileage: {
    type: Number
  },
  speed: {
    type: Number
  },
  note: {
    type: String
  },
  addedDate: {
    type: Date
  },
  score: {
    type: Number
  }
},{
    collection: 'mileage'
});

module.exports = mongoose.model('Mileage', Mileage);