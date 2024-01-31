const express = require("express")
const CategoryController = require("./category.controller")

const routes = express.Router()

routes.post("/", async (req, res, next) => {
  try {
    const data = req.body
    const result = await CategoryController.create(data)
    return res.status(result ? 200 : 500).json({
      success: result,
      message: result ? `Created successfully` : `Failed to create`,
    })
  } catch (error) {
    next(error)
  }
})

const CategoryRoutes = routes

module.exports = CategoryRoutes
