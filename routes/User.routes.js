const router = require("express").Router();
const User = require("../models/User.model.js")

router.get("/:userId", async (req, res, next) => {
    try {
      const oneUser = await User.findOne({ _id: req.params.userId });
      res.status(200).json(oneUser);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;