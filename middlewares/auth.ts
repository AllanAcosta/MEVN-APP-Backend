import tokenService from "../services/token"

export default {
  verifyAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No Token",
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (response.role == "Administrator") {
      next()
    } else {
      return res.status(403).send({
        message: "Not Authorized",
      })
    }
  },
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No Token",
      })
    }
    const response = await tokenService.decode(req.headers.token)

    if (response.role == "Administrator" || response.role == "User") {
      next()
    } else {
      return res.status(403).send({
        message: "Not Authorized",
      })
    }
  },
}
