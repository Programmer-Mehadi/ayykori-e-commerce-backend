const express = require("express")
const OrderController = require("./order.controller")
const Order = require("./order.model")

const routes = express.Router()

routes.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find({})
    return res.status(200).json({
      success: true,
      data: orders,
    })
  } catch (error) {
    next(error)
  }
})
routes.post("/place-order", async (req, res, next) => {
  try {
    const orderData = req.body
    const order = await OrderController.placeOrder(orderData)
    if (order.success) {
      return res.status(order.success ? 200 : 500).json({
        success: order.success,
        message: order.success
          ? `Order created successfully`
          : `Failed to create order`,
      })
    } else {
      next(order.error)
    }
  } catch (error) {
    next(error)
  }
})
const OrderRoutes = routes

module.exports = OrderRoutes
