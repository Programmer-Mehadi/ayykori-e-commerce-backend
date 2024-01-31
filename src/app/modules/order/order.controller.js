const mongoose = require("mongoose")
const ApiError = require("../../../errors/ApiError")
const Order = require("./order.model")
const Product = require("../product/product.model")

async function placeOrder(data) {
  const session = await mongoose.startSession()
  // Start a transaction
  session.startTransaction()

  let result = {
    success: false,
    error: "Could not place order",
  }

  try {
    // TODO: Create a new order object in the order collection
    const orderResult = await Order.create(data)

    // If order creation was successful, proceed with quantity updates
    if (orderResult) {
      // TODO: then reduce the product quantity
      const productModifyResult = await Promise.all(
        data?.productList?.map(async (product) => {
          try {
            const productResult = await Product.updateOne(
              {
                _id: product.productId,
              },
              {
                $inc: { quantity: -product.quantity },
              }
            )

            if (productResult?.modifiedCount === 0) {
              // If the quantity update was not successful, throw an error
              throw new Error(
                `Failed to update quantity for product with ID: ${product.productId}`
              )
            }

            return productResult
          } catch (error) {
            // Handle the error here, log it, or perform any necessary actions
            console.error(
              `Error updating quantity for product with ID ${product.productId}: ${error.message}`
            )
            // Re-throw the error to propagate it
            throw error
          }
        })
      )

      // If both order creation and quantity updates were successful, commit the transaction
      await session.commitTransaction()
      result = {
        success: true,
        error: "",
      }
    }
  } catch (error) {
    // If an error occurs, abort the transaction
    await session.abortTransaction()
    throw error
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
