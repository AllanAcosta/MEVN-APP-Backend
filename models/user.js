import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 64,
  },
  email: {
    type: String,
    required: true,
    uniquer:true,
    min: 6,
    max: 48,
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
