// getting-started.js

const conn = require("./conn")
const mongoose = require("mongoose")

main().catch((err) => console.log(err))
const port = 8080

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ayykori-ecommerce")
  console.log("Connected to MongoDB 💚")
  conn.listen(port, () => {
    console.log(
      `Server is running on port ${port}, server: http://localhost:${port}`
    )
  })
}
