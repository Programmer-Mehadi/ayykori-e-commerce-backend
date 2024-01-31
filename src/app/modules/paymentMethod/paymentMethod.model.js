const mongoose = require("mongoose")
const { Schema } = mongoose
const paymentMethod = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: undefined },
  image: { type: String, default: undefined },
})

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethod)

module.exports = PaymentMethod
