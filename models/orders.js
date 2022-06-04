// needs: order_ID, cust_ID, food_ID, qty, total, delivery_ID, date
const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    customerID: { type: String },
    items: [{ 
        itemName: { type: String },
        qty: { type: Number, multipleOf: 1 },
        price: { type: Number, multipleOf: 0.01 }
    }],
    totalPrice: { type: Number, multipleOf: 0.01 },
    orderDate: { type: Date }

});

const Order = mongoose.model("Order", ordersSchema);

module.exports = Order;