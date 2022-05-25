const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: String,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    required: true,
  },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, require: true },
  zip: { type: Number, max: 99999, required: true },
  payment: 
    {
      required: false, 
      type: { type: String, required: true },
      cardNumber: { type: Number, required: true },
      expiration: { type: Date, required: true },
      cvv: { type: Number, required: true },
      nickname: { type: String, required: false },
    },
});

const User = mongoose.model("User", userSchema);
const Payment = mongoose.model("Payment", userSchema)

module.exports = User, Payment;
