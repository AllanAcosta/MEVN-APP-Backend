import jwt from "jsonwebtoken"
import models from "../models"

async function checkToken(token) {
  let __id = null
  try {
    const { _id } = await jwt.decode(token)
    __id = _id
  } catch (e) {
    return false
  }
  const user = await models.User.findOne({
    _id: __id,
    estado: 1,
  })

  if (user) {
    const token = jwt.sign({ _id: __id }, "secret", { expiresIn: "1d" })
  }
  return token
}

export default {
  encode: async (_id) => {
    const token = jwt.sign({ _id: _id }, "secret", { expiresIn: "1d" })
    return token
  },

  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, "secret")
      const user = await models.User.findOne({
        _id,
        estado: 1,
      })

      if (user) {
        return user
      } else {
        return false
      }
    } catch (error) {
      const newToken = await checkToken(token)
      return newToken
    }
  },
}
