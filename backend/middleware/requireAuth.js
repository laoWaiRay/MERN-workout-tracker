const jwt = require("jsonwebtoken");
const User = require("../models/User")

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auth token required" })
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next()
  } catch (e) {
    console.error(e)
    res.status(401).json({ error: "Request unauthorized" })
  }
}

module.exports = requireAuth