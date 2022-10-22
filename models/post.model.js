const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    caption: String,
    image: String,
    likes: Array,
    comment: Array,
    type: String,
    imgUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", Post);
