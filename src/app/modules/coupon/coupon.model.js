const mongoose = require("mongoose")
const { Schema } = mongoose
const couponSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    couponType: {
      type: "money" | "percent",
      default: "money",
      required: true,
    },
    discountPriceOrPercent: {
      type: Number,
      required: true,
    },
    maxDiscount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    validateItemList: {
      type: "all" | "specified",
      default: "all",
      required: true,
    },
    items: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = Coupon
