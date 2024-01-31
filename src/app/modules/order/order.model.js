const mongoose = require("mongoose")
const { Schema } = mongoose

const orderProductSchema = new Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
    couponId: {
      type: mongoose.Types.ObjectId,
      ref: "Coupon",
    },
    discountId: {
      type: mongoose.Types.ObjectId,
      ref: "Discount",
    },
    taxId: {
      type: mongoose.Types.ObjectId,
      ref: "Tax",
    },
  },
  {
    timestamps: true,
  }
)
const deliveryAddress = new Schema(
  {
    id: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postal_code: { type: String, required: true },
    phone_number: { type: String, required: true },
    additional_phone_number: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const orderSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    productList: {
      type: [orderProductSchema],
      required: true,
    },
    buyerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    }, // mongodb objectID
    deliveryAddress: {
      type: deliveryAddress,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
