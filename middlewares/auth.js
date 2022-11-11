import tokenService from "../services/token"

export default {
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No Token",
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (
      response.role == "Administrator" ||
      response.role == "Client" ||
      response.role == "Seller"
    ) {
      next()
    } else {
      return res.status(403).send({
        message: "Not Authorized",
      })
    }
  },
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
  verifyClient: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No Token",
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (response.role == "Administrator" || response.role == "Client") {
      next()
    } else {
      return res.status(403).send({
        message: "Not Authorized",
      })
    }
  },
  verifySeller: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No Token",
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (response.role == "Administrator" || response.role == "Seller") {
      next()
    } else {
      return res.status(403).send({
        message: "Not Authorized",
      })
    }
  },
}
