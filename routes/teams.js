const express = require("express");
const router = express.Router();
// const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/auth");
const fileUploader = require("../middleware/cloudinary");
const saltround = 10;
const Team = require("../models/Team");

router.post("/", isAuthenticated, async (req, res) => {
  const likedTeams = await Team.create({
    creatorId: req.user.id,
    teamId: req.body.teamId,
    teamImg: req.body.teamImg,
    fullName: req.body.fullName,
  });
  res.json(likedTeams);
});

router.get("/details", isAuthenticated, async (req, res) => {
  try {
    let teamDetails = await Team.find({ creatorId: req.user.id }).populate(
      "creatorId"
    );
    res.json(teamDetails);
  } catch (err) {
    res.json(err.message);
  }
});
// router.get()

module.exports = router;
