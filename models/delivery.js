// needs (for delivery driver) firstName, lastName, phone, carMake, carModel, carColor, carLicense
const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: {
    type: String,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    required: true,
  },
  carMake: { type: String },
  carModel: { type: String },
  carColor: { type: String },
  carLicense: { type: String }
});

const Driver = mongoose.model("Driver", deliverySchema);

module.exports = Driver;