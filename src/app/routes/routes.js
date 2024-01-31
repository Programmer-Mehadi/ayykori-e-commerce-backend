const express = require("express")
const UserRoutes = require("../modules/user/user.route")
const OrderRoutes = require("../modules/order/order.route")

const routes = express.Router()

const routesList = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
]

routesList.forEach((route) => routes.use(route.path, route.route))

module.exports = routes
