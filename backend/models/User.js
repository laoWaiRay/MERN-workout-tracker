const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Static method on User model for logging in
userSchema.statics.login = async function(username, password) {
  // Validations
  if (!username || !password) {
    throw Error("Fields must not be empty")
  }

  const user = await this.findOne({ username })

  if (!user) {
    throw Error("Incorrect username or password")
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect username or password")
  }

  return user  
}

// Static method on User model for signing up
userSchema.statics.signup = async function(username, password) {
  // Validations
  if (!username || !password) {
    throw Error("Fields must not be empty")
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password must be at least 8 characters long, contain at least 1 symbol, and at least 1 uppercase");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username is already in use")
  }
  
  // Generate salt and hash the password
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const user = await this.create({
    username,
    password: hash
  })

  return user
}

module.exports = mongoose.model("User", userSchema)