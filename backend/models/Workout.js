const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercise: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
  time: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Workout", workoutSchema)