const mongoose = require("mongoose")
const ApiError = require("../../../errors/ApiError")

async function placeOrder(data) {
  const session = await mongoose.startSession()
  // Start a transaction
  session.startTransaction()
  let result = false
  try {
    // TODO: Create a new order object to order collection
    // TODO: then reduce the product quantity
    // TODO: then insert a new record to the payment transaction collection
    //? finally commit the transaction
    await session.commitTransaction()
    result = true
  } catch (error) {
    // If an error occurs, abort the transaction
    await session.abortTransaction()
    result = false
  } finally {
    // Always close the session
    session.endSession()
    return result
  }
}

const OrderController = {
  placeOrder,
}

module.exports = OrderController
