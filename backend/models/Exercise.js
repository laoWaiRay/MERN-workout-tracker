const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  color: {
    type: String
  }
})