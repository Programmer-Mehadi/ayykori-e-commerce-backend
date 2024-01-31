const express = require("express")
const UserRoutes = require("../modules/user/user.route")

const routes = express.Router()

const routesList = [
  {
    path: "/users",
    route: UserRoutes,
  },
]

routesList.forEach((route) => routes.use(route.path, route.route))

module.exports = routes
