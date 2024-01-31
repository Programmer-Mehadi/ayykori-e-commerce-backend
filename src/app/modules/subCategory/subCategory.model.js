const mongoose = require("mongoose")
const { Schema } = mongoose
const subCategorySchema = new Schema(
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
    parent: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
)

const SubCategory = mongoose.model("SubCategory", subCategorySchema)

module.exports = SubCategory
