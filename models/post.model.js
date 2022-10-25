const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    caption: String,
    likes: Array,
    comment: Array,
    type: String,
    imgUrl: Buffer,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", Post);
