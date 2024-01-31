const mongoose = require("mongoose")
const { Schema } = mongoose
const categorySchema = new Schema(
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

const Category = mongoose.model("Category", categorySchema)

module.exports = Category
