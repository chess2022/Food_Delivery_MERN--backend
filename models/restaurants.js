const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, require: true },
  zip: { type: Number, max: 99999, required: true },
  phone: {
    type: String,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    required: true,
  },
  menuItem: {
    required: false,
    itemName: { type: String },
    itemImg: { type: String },
    itemPrice: { type: Number, multipleOf: 0.01 },
    itemDescription: { type: String },
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const MenuItem = mongoose.model("MenuItem", restaurantSchema);

module.exports = Restaurant, MenuItem;