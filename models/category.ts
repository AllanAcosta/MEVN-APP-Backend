import mongoose, { Schema } from "mongoose"

const categorySchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    maxlength: 360,
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

const Category = mongoose.model("category", categorySchema)

export default Category
