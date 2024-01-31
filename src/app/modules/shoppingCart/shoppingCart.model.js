const mongoose = require("mongoose")
const { Schema } = mongoose
const shoppingCart = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productList: {
      type: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Product",
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCart)

module.exports = ShoppingCart
