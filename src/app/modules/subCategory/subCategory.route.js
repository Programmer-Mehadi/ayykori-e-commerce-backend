const express = require("express")
const SubCategoryController = require("./subCategory.controller")

const routes = express.Router()

routes.post("/", async (req, res, next) => {
  try {
    const data = req.body
    const result = await SubCategoryController.create(data)
    return res.status(result ? 200 : 500).json({
      success: result,
      message: result ? `Created successfully` : `Failed to create`,
    })
  } catch (error) {
    next(error)
  }
})

const SubCategoryRoutes = routes

module.exports = SubCategoryRoutes
