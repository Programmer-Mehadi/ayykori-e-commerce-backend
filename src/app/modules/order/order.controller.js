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
    error: "",
  }

  try {
    // TODO: Create a new order object in the order collection
    const orderResult = await Order.create([data], { session })

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
              },
              { session }
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
            // Re-throw the error to propagate it
            throw error
          }
        })
      )
      // TODO: create a payment in payment collection
      try {
        const paymentResult = await Payment.create(
          {
            id: `p-${math.ceil(Math.random() * 1000)}`,
            orderId: orderResult[0]._id,
            total: orderResult[0].total,
            buyerId: orderResult[0].buyerId,
          },
          {
            session,
          }
        )

        if (paymentResult.length > 0) {
          result = {
            success: true,
            error: "",
          }
        } else {
          result = {
            success: false,
            error: "Failed to create payment",
          }
          throw new Error("Failed to create payment")
        }
      } catch (err) {
        throw err
      }
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
