const conn = require("./conn")
const mongoose = require("mongoose")
const port = 8080

// call main function
main().catch((err) => console.log(err))

// main function to connect to mongodb
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ayykori-ecommerce")
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
