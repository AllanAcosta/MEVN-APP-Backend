import mongoose, { Schema } from "mongoose";
import joi from "@hapi/joi"

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  estado: {
    type: Number,
    default: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
