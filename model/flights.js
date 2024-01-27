const mongoose = require("mongoose");

require("./destinations")


const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ["American", "Austria", "New Zealand", "Australia"],
  },
  airport: {
    type: String,
    enum: ["LAX", "DFW", "AUS", "DEN", "SAN"],
    default: "LAX",
  },

  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: getDatePlusOneYear,
  },
  destinations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }],
});

function getDatePlusOneYear() {
  const today = new Date();
  return new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
}




module.exports = mongoose.model("Flight", flightSchema);
