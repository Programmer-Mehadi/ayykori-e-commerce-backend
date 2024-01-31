const User = require("./user.model")

async function create(data) {
  const result = await User.create(data)
  return result
}

const UserController = { create }

module.exports = UserController
