const winston = require("winston")
const path = require("path")

const MyLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "error", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "combined", "combined.log"),
    }),
  ],
})

module.exports = MyLogger
