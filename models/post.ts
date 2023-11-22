import mongoose, { Schema } from "mongoose"

const postSchema = new Schema({
  category: {
    type: Schema.ObjectId,
    ref: "category",
  },
  postUrl: {
    type: String,
    maxlength: 80,
    required: true,
  },
  title: {
    type: String,
    maxlength: 80,
    required: true,
  },
  featuredImage: {
    type: String,
    maxlength: 180,
    required: true,
  },
  featuredImageAltText: {
    type: String,
    maxlength: 180,
    required: true,
  },
  content: {
    type: String,
    maxlength: 2000,
    required: true,
  },
  metaKeywords: {
    type: String,
    maxlength: 2000,
  },
  metaTitle: {
    type: String,
    maxlength: 2000,
  },
  metaDescription: {
    type: String,
    maxlength: 2000,
  },
  state: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.model("post", postSchema)

export default Post
