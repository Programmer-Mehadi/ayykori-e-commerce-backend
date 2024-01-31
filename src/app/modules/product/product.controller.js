const Product = require("./product.model")

async function create(data) {
  const result = await Product.create(data)
  return result
}

const ProductController = { create }

module.exports = ProductController
