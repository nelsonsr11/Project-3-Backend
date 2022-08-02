const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth");
const fileUploader = require("../middleware/cloudinary");
const saltround = 10;
const Team = require("../models/Team");

router.post("/signup", async (req, res) => {
  if (
    // !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.fullname ||
    req.body.password.length < 6
  ) {
    return res
      .status(400)
      .json({ message: "Please include valid credentials" });
  }
  try {
    const salt = bcrypt.genSaltSync(saltround);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      // username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      // phone: req.body.phone,
      profilePic: req.body.profilePic,
      password: hashedPass,
    });

    const payload = {
      username: newUser.username,
      id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6H",
    });
    res.json({ token: token, id: newUser._id });
  } catch (err) {
    res.json(err.message);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({
      message: "Please include a valid username and password",
    });
  }
  try {
    let foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });
    }
    let isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });
    }

    const payload = {
      username: foundUser.username,
      id: foundUser._id,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6H",
    });
    res.json({ token: token, id: foundUser._id });
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/login-test", isAuthenticated, (req, res) => {
  res.json({ message: "You are logged in" });
});

router.post("/add-picture", fileUploader.single("imageUrl"), async (req, res) =>
  res.json(req.file)
);

router.get("/profile", isAuthenticated, async (req, res) => {
  const viewProfile = await User.findById(req.user.id);
  res.json(viewProfile);
});

router.post("/update-profile", isAuthenticated, async (req, res) => {
  const updateProfile = await User.findByIdAndUpdate();
});

module.exports = router;
