const Category = require("./category.model")

async function create(data) {
  const result = await Category.create(data)
  return result
}

const CategoryController = { create }

module.exports = CategoryController
