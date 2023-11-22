import models from "../models"
import bcryptjs from "bcryptjs"
import tokenService from "../services/token"

export default {
  register: async (req, res, next) => {
    const regexAlphaOnly = /^[A-Za-z]+$/
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const email = req.body.email
    let emailValidationStatus = false

    const role = req.body.role
    let roleValidationStatus = false

    // const emailRegisterCheck = await models.User.findOne({
    //   email: req.query.email,
    // })

    if (email != null || email != "") {
      if (regexEmail.test(email) == true) {
        emailValidationStatus = true
      } else {
        res.status(500).send({
          message: "El formato de correo electronico es incorrecto.",
        })
      }
    } else {
      res.status(500).send({
        message: "El campo de correo electronico no debe estar vacio.",
      })
    }

    if (emailValidationStatus === true) {
      const emailRegisterCheck = await models.User.findOne({
        email: req.body.email,
      })

      if (!emailRegisterCheck) {
        try {
          req.body.password = await bcryptjs.hash(req.body.password, 10)
          const reg = await models.User.create(req.body)

          res.status(200).send({
            message: "Usuario Registrado Exitosamente",
          })
        } catch (e) {
          res.status(500).send({
            message: "ocurrio un error",
          })
          next(e)
        }
      } else {
        res.status(500).send({
          message: "El email ya ha sido registrado",
        })
      }
    } else {
      res.status(500).send({
        message: "El usuario ya existe",
      })
      next
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.User.findOne({
        _id: req.query.id,
      })
      if (!reg) {
        res.status(404).send({
          message: "El Registro no existe",
        })
      } else {
        res.status(200).json(reg)
      }
    } catch (e) {
      res.status(500).send({
        message: "ocurrio un error",
      })
      next(e)
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor
      const reg = await models.User.find(
        {
          $or: [{ email: new RegExp(valor, "i") }],
        },
        {
          createdAt: 0,
        }
      ).sort({ createdAt: 1 })

      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "ocurrio un error",
      })
      next(e)
    }
  },
  update: async (req, res, next) => {
    try {
      let password = req.body.password
      const reg0 = await models.User.findOne({
        _id: req.body._id,
      })

      if (password != reg0.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10)
      }

      const reg = await models.User.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          email: req.body.email,
        }
      )
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "ocurrio un error",
      })
      next(e)
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndDelete({
        _id: req.body._id,
      })
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "ocurrio un error",
      })
      next(e)
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          estado: 1,
        }
      )
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "ocurrio un error",
      })
      next(e)
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.User.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          estado: 0,
        }
      )
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "ocurrio un error",
      })
      next(e)
    }
  },
  login: async (req, res, next) => {
    try {
      let user = await models.User.findOne({
        email: req.body.email,
      })

      if (user) {
        //user exists
        let match = await bcryptjs.compare(req.body.password, user.password)

        if (match) {
          const userToken = await tokenService.encode(user.id)
          const reg = await models.Backlog.create({ user })

          res.status(200).json({ user, userToken })
        } else {
          res.status(403).send({
            message: "Password Incorrecto",
          })
        }
      } else {
        res.status(404).send({
          message: "el usuario ingresado no existe",
        })
      }
    } catch (e) {
      res.status(500).send({
        message: "ha ocurrido un error",
      })
      next(e)
    }
  },
  userAuth: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "No Token",
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (response) {
      return res.status(200).send({
        authenticated: true,
        message: "User is authenticated",
      })
      next()
    } else {
      return res.status(403).send({
        authenticated: false,
        message: "Not Authorized",
      })
    }
  },
}
