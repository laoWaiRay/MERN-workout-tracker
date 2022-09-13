const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercise: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
  user_id: {
    type: String,
    required: true
  }
})