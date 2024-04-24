const User = require("../models/User.model.js");

async function isWorker(req, res, next) {
  try {
    const currentUser = await User.findById(req.currentUserId);
    if (currentUser.role === "worker") {
      return next();
    }
    res.status(403).send("not allowed");
  } catch (error) {
    next(error);
  }
}
module.exports = isWorker;
