import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  role: {
    type: String,
    max: 4,
    default: "User",
  },
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 48,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 48,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 300,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 48,
  },
  bio: {
    type: String,
    max: 600,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  estado: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model("user", userSchema)

export default User
