const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const routes = require("./app/routes/routes.js")
const globalErrorHandler = require("./app/middlewares/globalErrorHandler.js")
const conn = express()

conn.use(cors())
conn.use(express.json())
conn.use(express.urlencoded({ extended: true }))
dotenv.config()

conn.use("/api/v1", routes)

conn.use(globalErrorHandler)

conn.get("/", (req, res) => {
  return res.json({ success: true, message: "Server is up and running" })
})

module.exports = conn
