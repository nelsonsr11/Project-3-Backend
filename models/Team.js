const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  teamImg: {
    type: String,
  },
  fullName: {
    type: String,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
