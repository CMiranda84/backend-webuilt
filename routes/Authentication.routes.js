const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const fileUploader = require("../config/cloudinary.config.js");
const SALT = 12;

router.post("/signup", fileUploader.single("image"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const filePath = req.file.path;
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "This email is already used." });
    }
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image: filePath,
    });

    res.status(201).json({
      message: "Account created.",
      id: createdUser._id,
    });
  } catch (error) {
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }, { password: 1, email: 1 });
    if (!foundUser) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    res.json({ authToken: token });
  } catch (error) {
    next(error);
  }
});
router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.currentUserId);
    console.log(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
