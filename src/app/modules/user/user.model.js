const mongoose = require("mongoose")
const { Schema } = mongoose
const deliveryAddress = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    additional_phone_number: {
      type: String,
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
    default: "",
  },
  deliveryAddress: [deliveryAddress],
})

const User = mongoose.model("User", userSchema)

module.exports = User
