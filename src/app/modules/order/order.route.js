const express = require("express")
const OrderController = require("./order.controller")

const routes = express.Router()

routes.post("/place-order", async (req, res) => {
  const orderData = req.body
  const order = await OrderController.placeOrder(orderData)
  return res.status(order ? 200 : 500).json({
    success: order,
    message: order ? `Order created successfully` : `Failed to create order`,
  })
})

const OrderRoutes = routes

module.exports = OrderRoutes
