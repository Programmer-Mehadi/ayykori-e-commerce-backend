const SubCategory = require("./subCategory.model")

async function create(data) {
  const result = await SubCategory.create(data)
  return result
}

const SubCategoryController = { create }

module.exports = SubCategoryController
