import models from "../models"
import bcryptjs from "bcryptjs"
import token from "../services/token.js"

export default {
  add: async (req, res, next) => {
    const regexAlphaOnly = /^[A-Za-z]+$/
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const username = req.body.username
    let usrValidationStatus = false

    const email = req.body.email
    let emailValidationStatus = false

    const role = req.body.role
    let roleValidationStatus = false

    // const emailRegisterCheck = await models.User.findOne({
    //   email: req.query.email,
    // })

    if (username != null && username != "") {
      if (regexAlphaOnly.test(username) === true) {
        usrValidationStatus = true
      } else {
        res.status(500).send({
          message: "El nombre solo debe contener letras.",
        })
      }
    } else {
      res.status(500).send({
        message: "El nombre de usuario no debe estar vacio.",
      })
    }

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

    if (role != null && role != "") {
      roleValidationStatus = true
    } else {
      res.status(500).send({
        message: "El rol del usuario es obligatorio",
      })
    }

    if (
      usrValidationStatus === true &&
      emailValidationStatus === true &&
      roleValidationStatus === true
    ) {
      const usrNameRegisterCheck = await models.User.findOne({
        username: req.body.username,
      })

      if (!usrNameRegisterCheck) {
        try {
          req.body.password = await bcryptjs.hash(req.body.password, 10)
          const reg = models.User.create(req.body)
          res.status(200).send({
            message: "Usuario Registrado",
          })
        } catch (e) {
          res.status(500).send({
            message: "ocurrio un error",
          })
          next(e)
        }
      } else {
        res.status(500).send({
          message: "El usuario ya existe",
        })
      }
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
      console.log(req.query)
      const reg = await models.User.find(
        {
          $or: [{ username: new RegExp(valor, "i") }],
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
      console.log(reg0)

      if (password != reg0.password) {
        req.body.password = await bcryptjs.hash(req.body.password, 10)
      }

      const reg = await models.User.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          username: req.body.username,
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
        estado: 1,
      })

      if (user) {
        //user exists
        let match = await bcryptjs.compare(req.body.password, user.password)

        if (match) {
          let tokenOutput = await token.encode(user.id)
          res.status(200).json({ user, tokenOutput })
        } else {
          res.status(404).send({
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
}
