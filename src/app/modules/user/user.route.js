const express = require("express")

const routes = express.Router()

routes.get("/", (req, res) => {
  res.json({
    success: true,
    message: "All User get route",
  })
})

const UserRoutes = routes

module.exports = UserRoutes
