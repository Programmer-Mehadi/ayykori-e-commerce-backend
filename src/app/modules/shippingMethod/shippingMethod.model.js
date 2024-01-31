const mongoose = require("mongoose")
const { Schema } = mongoose

const shippingMethod = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type:
        "Standard Shipping" |
        "Express Shipping" |
        "Free Shipping" |
        "Flat Rate Shipping",
      required: true,
      unique: true,
    },
    code: {
      type:
        "StandardShipping" |
        "ExpressShipping" |
        "FreeShipping" |
        "FlatRateShipping",
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Shipping = mongoose.model("Shipping", shippingMethod)

module.exports = Shipping
