import models from "../models"

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Item.create(req.body)
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "ocurrio un error",
      })
      next(e)
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Item.findOne({
        _id: req.query._id,
      }).populate("categoria", { nombre: 1 })
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
      const reg = await models.Item.find(
        {
          $or: [{ name: new RegExp(valor, "i") }, { description: new RegExp(valor, "i") }],
        },
        {
          createdAt: 0,
        }
      )
        .populate("category", { nombre: 1 })
        .sort({ createdAt: 1 })

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
      const reg = await models.Item.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          category: req.body.category,
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          sell_price: req.body.sell_price,
          stock: req.body.stock,
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
      const reg = await models.Item.findByIdAndDelete({
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
      const reg = await models.Item.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          state: 1,
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
      const reg = await models.Item.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          state: 0,
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
}
