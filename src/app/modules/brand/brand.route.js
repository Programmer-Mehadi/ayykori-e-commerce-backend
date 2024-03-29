const express = require("express")
const BrandController = require("./brand.controller")

const routes = express.Router()

routes.post("/", async (req, res, next) => {
  try {
    const data = req.body
    const result = await BrandController.createBrand(data)
    return res.status(result ? 200 : 500).json({
      success: result,
      message: result ? `Brand created successfully` : `Failed to create Brand`,
    })
  } catch (error) {
    next(error)
  }
})

const BrandRoutes = routes

module.exports = BrandRoutes
