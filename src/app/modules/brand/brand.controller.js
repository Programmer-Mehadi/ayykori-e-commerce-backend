const Brand = require("./brand.model")

async function createBrand(data) {
  const brand = await Brand.create(data)
  return brand
}

const BrandController = { createBrand }

module.exports = BrandController
