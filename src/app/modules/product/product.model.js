const mongoose = require("mongoose")
const { Schema } = mongoose
const productSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    image_list: {
      type: [String],
      default: [],
    },
    stock_quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    can_out_stock_order: {
      type: Boolean,
      default: false,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountId: {
      type: mongoose.Types.ObjectId,
      ref: "Discount",
    },
    couponId: {
      type: mongoose.Types.ObjectId,
      ref: "Coupon",
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product
