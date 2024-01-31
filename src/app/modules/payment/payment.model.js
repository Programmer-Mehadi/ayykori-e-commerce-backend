const mongoose = require("mongoose")
const { Schema } = mongoose
const paymentSchema = new Schema(
  {
    id: { type: String, required: true },
    paymentMethodId: {
      type: mongoose.Types.ObjectId,
      required: true,
      default: "",
      ref: "PaymentMethod",
    },
    status: { type: String, default: "Pending" },
    total: { type: Number, default: 0 },
    transactionId: { type: String, default: "" },
    buyerId: { type: mongoose.Types.ObjectId, ref: "User" },
    orderId: { type: mongoose.Types.ObjectId, ref: "Order" },
    paymentDate: { type: Date, default: Date.now() },
    paymentDetails: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
)

const Payment = mongoose.model("Payment", paymentSchema)

module.exports = Payment
