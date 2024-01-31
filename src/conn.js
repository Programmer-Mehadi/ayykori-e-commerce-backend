const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const routes = require("./app/routes/routes.js")
const globalErrorHandler = require("./app/middlewares/globalErrorHandler.js")
const conn = express()
const rateLimit = require("express-rate-limit")
const MyLogger = require("./app/logger/MyLogger.js")

// middlewares
conn.use(cors())
conn.use(express.json())
conn.use(express.urlencoded({ extended: true }))
dotenv.config()

// Rate limiting middleware configuration
// Create an in-memory store for keeping track of request counts
const requestCounts = {}
// Rate limiting middleware configuration

const keyGenerator = (req) => {
  // TODO: we can add own by reference api-key per request
  // ? get request api-key per request or IP address per request
  return req.headers["api-key"] || req.ip
}

// Create a rate limiter
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Maximum 10 requests per windowMs (per IP address)
  keyGenerator: keyGenerator,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    const clientKey = keyGenerator(req)

    // Increment the request count for the client
    requestCounts[clientKey] = (requestCounts[clientKey] || 0) + 1

    return res.status(429).json({
      success: false,
      message: `You can only make 10 requests every 1 minutes. Your request count: ${requestCounts[clientKey]}`,
    })
  },
})
// create a rate limiter for individual routes
const individualLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Maximum 10 requests per windowMs (per IP address)
  keyGenerator: keyGenerator,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    const clientKey = keyGenerator(req)

    // Increment the request count for the client
    requestCounts[clientKey] = (requestCounts[clientKey] || 0) + 1

    return res.status(429).json({
      success: false,
      message: `You can only make 5 requests per api every 1 minutes. Your request count: ${requestCounts[clientKey]}`,
    })
  },
})

// Apply the rate limiter to specific routes or all routes
// conn.use("/", globalLimiter)

// Apply the rate limiter to specific routes
// conn.use("/api/v1", individualLimiter)

// set the routes
conn.use("/api/v1", routes)

// set global error handler
conn.use(globalErrorHandler)

// set the server root api
conn.get("/", (req, res) => {
  return res.json({ success: true, message: "Server is up and running" })
})

conn.use("*", (req, res) => {
  MyLogger.error(`🙄 Api ${req.originalUrl} not found 🚫`)
  res.status(404).send({
    success: false,
    message: `🙄 Api ${req.originalUrl} not found 🚫`,
  })
})

conn.use((error, req, res) => {
  MyLogger.error(error + new Date().toString())
  return res.status(500).json({
    success: false,
    error: {
      message: error?.message,
    },
    stack: error?.stack,
  })
})
module.exports = conn
