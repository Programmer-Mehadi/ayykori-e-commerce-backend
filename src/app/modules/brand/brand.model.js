const mongoose = require("mongoose")
const { Schema } = mongoose
const brandSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model("Brand", brandSchema)

module.exports = Brand
