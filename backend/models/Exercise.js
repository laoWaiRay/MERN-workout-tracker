const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String
  },
  color: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Exercise", exerciseSchema)