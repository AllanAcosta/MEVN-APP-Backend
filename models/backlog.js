import mongoose, { Schema } from "mongoose"

const backlogSchema = new Schema({
  user: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Backlog = mongoose.model("backlog", backlogSchema)

export default Backlog
