const configEnv = require("./config/configEnv")
const conn = require("./conn")
const mongoose = require("mongoose")
const port = 8080

// call main function
main().catch((err) => console.log(err))

// main function to connect to mongodb
async function main() {
  try {
    console.log(configEnv.database_url)
    await mongoose.connect(
      "mongodb+srv://new_user:422023@cluster0.i2mgkc0.mongodb.net/ayykori-ecommerce?retryWrites=true&w=majority"
    )
    console.log("Connected to MongoDB 💚")
    conn.listen(port, () => {
      console.log(
        `Server is running on port ${port}, server: http://localhost:${port} 💝`
      )
    })
  } catch (error) {
    console.log(error)
  }
}
