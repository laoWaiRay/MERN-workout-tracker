const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const goalSchema = new Schema({
  goal_type: {
    type: String,
    enum: ["frequency", "time"],
    required: true
  },
  time: {
    type: Number,
    min: 0
  },
  frequency: {
    type: Number,
    min: 0
  },
  achieved: {
    type: Boolean,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  exercise: [{ type: Schema.Types.ObjectId, ref: "Exercise" }]
})

module.exports = mongoose.model("Goal", goalSchema)