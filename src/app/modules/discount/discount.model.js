const mongoose = require("mongoose")
const { Schema } = mongoose
const discountSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    discountType: { type: String, enum: ["money", "percent"], required: true },
    discountPriceOrPercent: { type: Number, required: true },
    maxDiscount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    validateItemList: {
      type: String,
      enum: ["all", "specified"],
      required: true,
    },
    items: {
      type: [String],
      default: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
)

const Discount = mongoose.model("Discount", discountSchema)

module.exports = Discount
