import mongoose, { Schema } from "mongoose"

const itemSchema = new Schema({
  category: {
    type: Schema.ObjectId,
    ref: "category",
  },
  code: {
    type: String,
    maxlength: 64,
    required: true,
  },
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    maxlength: 360,
    required: true,
  },
  sell_price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  state: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Item = mongoose.model("item", itemSchema)

export default Item
