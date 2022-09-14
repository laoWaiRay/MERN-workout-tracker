const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

exports.loginUser = async (req, res) => {
  const { username, password} = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

exports.signupUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password)
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" })
  }

  // req.user._id is of type ObjectID, so must convert to a string in order to compare
  if (req.user._id.toString() !== id) {
    console.log(req.user._id)
    return res.status(401).json({ error: "Unauthorized user" })
  }

  User.findByIdAndRemove(id, (err, deletedUser) => {
    if (err) { return next(err) };
    res.status(200).json(deletedUser);
  })
}