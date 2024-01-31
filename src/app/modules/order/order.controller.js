const mongoose = require("mongoose")
const Order = require("./order.model")
const Product = require("../product/product.model")
const Payment = require("../payment/payment.model")

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
    const orderResult = await Order.create([data], { session: session })

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
              result = {
                success: false,
                error: "Failed to update quantity",
              }
              return undefined
            } else {
              return productResult
            }
          } catch (error) {
            // Handle the error here, log it, or perform any necessary actions
            // Re-throw the error to propagate it
            result = {
              success: false,
              error: error,
            }
          }
        })
      )
      // TODO: create a payment in payment collection

      const paymentResult = await Payment.create({
        id: `p-${Math.ceil(Math.random() * 1000)}`,
        orderId: orderResult[0]._id,
        total: orderResult[0].total,
        paymentMethodId: "65ba1a71bccae12eb69ffa12",
        buyerId: orderResult[0].buyerId,
        transactionId: Math.floor(Math.random() * 1000).toString(),
      })
      if (paymentResult) {
        result = {
          success: true,
          error: "",
        }
      }
      // If both order creation and quantity updates were successful, commit the transaction
      if (paymentResult) {
        await session.commitTransaction()
        result = {
          success: true,
          error: "",
        }
      } else {
        // If payment creation was not successful, rollback the transaction
        await session.abortTransaction()
        result = {
          success: false,
          error: "Failed to create payment",
        }
      }
    }
  } catch (error) {
    // If an error occurs, abort the transaction
    await session.abortTransaction()
    result = {
      success: false,
      error: error,
    }
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
