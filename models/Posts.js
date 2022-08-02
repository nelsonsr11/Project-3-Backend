const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 4,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      // unique: true,
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
