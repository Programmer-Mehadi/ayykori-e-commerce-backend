const ApiError = require("../../errors/ApiError")
const handleCastError = require("../../errors/handleCastError")
const handleValidationError = require("../../errors/handleValidationError")

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = "Somehting went wrong !"
  let errorMessages = []
  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  }
  // check mongoose error
  else if (error.code && error.code === 11000) {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : []
  }
  // response
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: configEnv.env !== "production" ? error?.stack : undefined,
  })
  next()
}

module.exports = globalErrorHandler