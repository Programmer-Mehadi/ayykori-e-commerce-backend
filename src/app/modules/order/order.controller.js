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
              },
              {
                session: session,
              }
            )

            if (productResult?.modifiedCount === 0) {
              // If the quantity update was not successful, throw an error
              result = {
                success: false,
                error: "Failed to update quantity",
              }
              await session.abortTransaction()
              throw new Error("Failed to update quantity")
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
      const findUndefinedPayment = productModifyResult.find(
        (item) => item == undefined
      )
      if (findUndefinedPayment) {
        console.log(findUndefinedPayment)
        result = {
          success: false,
          error: "Failed to create payment",
        }
      } else {
        const paymentResult = await Payment.create(
          [
            {
              id: `p-${Math.ceil(Math.random() * 1000)
                .toString()
                .slice(0, 5)}`,
              orderId: orderResult[0]._id,
              total: orderResult[0].total,
              paymentMethodId: new mongoose.Types.ObjectId(
                "65ba1a71bccae12eb69ffa12"
              ),
              buyerId: orderResult[0].buyerId,
              transactionId: Math.random().toString().slice(2, 10),
            },
          ],
          {
            session: session,
          }
        )
        // If both order creation and quantity updates were successful, commit the transaction
        if (paymentResult[0]) {
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
