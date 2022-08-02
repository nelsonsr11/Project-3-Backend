var express = require("express");
var router = express.Router();
const Post = require("../models/Posts");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", function (req, res) {
  res.json({ title: "Posts" });
});

router.get("/all", async (req, res) => {
  try {
    const allPosts = await Post.find().populate("creatorId");
    res.json(allPosts);
  } catch (err) {
    res.json(err.message);
  }
});

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    let newPost = await Post.create({
      //   title: req.body.title,
      content: req.body.content,
      creatorId: req.user.id,
    });
    res.json(newPost);
  } catch (err) {
    res.json(err.message);
  }
});

router.post("/likes/:postId", isAuthenticated, async (req, res) => {
  try {
    let updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $addToSet: { likes: req.user.id } },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(err.message);
  }
});

router.delete("/delete/:postId", isAuthenticated, async (req, res) => {
  try {
    let deletedPost = await Post.findOneAndDelete(
      {
        creatorId: req.user.id,
        _id: req.params.postId,
      },
      { new: true }
    );
    res.json(deletedPost);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
