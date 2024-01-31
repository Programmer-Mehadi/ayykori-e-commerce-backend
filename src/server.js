const configEnv = require("./config/configEnv")
const conn = require("./conn")
const mongoose = require("mongoose")
const MyLogger = require("./app/logger/MyLogger")
const winston = require("winston")
const port = 8080

// call main function
main().catch((err) => console.log(err))

// main function to connect to mongodb
async function main() {
  try {
    await mongoose.connect(configEnv.database_url)
    console.log("Connected to MongoDB 💚")
    if (process.env.NODE_ENV !== "production") {
      MyLogger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      )
    }
    conn.listen(port, () => {
      MyLogger.info(`Server is running💝 ${new Date().toString()}`)
      console.log(
        `Server is running on port ${port}, server: http://localhost:${port} 💝`
      )
    })
  } catch (error) {
    console.log(error)
  }
}
