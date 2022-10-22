const postModel = require("../models/post.model");
const mongoose = require("mongoose");

module.exports.addPost = async (req, res) => {
  const { caption, imgUrl, type, userId } = req.body;
  try {
    const newPost = new postModel({
      caption,
      imgUrl,
      type,
      userId: mongoose.Types.ObjectId(userId),
    });

    await newPost.save();
    res.status(201).send("post successfully created");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
      err: err.message,
    });
  }
};
module.exports.deletePost = async (req, res) => {
  const { id } = req.query;
  try {
    await postModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    res.status(200).send("post deleted  successfully");
  } catch (error) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
      err: err.message,
    });
  }
};

module.exports.getAllPosts = async (_, res) => {
  try {
    const posts = await postModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    console.log(posts);
    res.status(200).send(posts);
  } catch (error) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
      err: err.message,
    });
  }
};
module.exports.likePost = async (req, res) => {
  const { postId, likedUserId } = req.body;
  try {
    const post = await postModel.findById(postId);

    const newLikedArray = [...post.likes, likedUserId];

    await postModel.findByIdAndUpdate(mongoose.Types.ObjectId(postId), {
      $set: { likes: newLikedArray },
    });
    res.status(200).send(" Liked Post successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
      err: err.message,
    });
  }
};

module.exports.commentPost = async (req, res) => {
  const { postId, commentUserId, commmentContent } = req.body;
  try {
    const post = await postModel.findById(postId);

    const newCommentArray = [
      ...post.comment,
      { commentUserId: commmentContent },
    ];

    await postModel.findByIdAndUpdate(mongoose.Types.ObjectId(postId), {
      $set: { comment: newCommentArray },
    });
    res.status(200).send(" Comment Post successfully");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal server error",
      err: err.message,
    });
  }
};
