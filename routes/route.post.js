const {
  addPost,
  getAllPosts,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/controller.post");

const router = require("express").Router();

router.get("/allPosts", getAllPosts);
router.post("/addpost", addPost);
router.delete("/deletePost", deletePost);
router.post("/likePost", likePost);
router.post("/commentPost", commentPost);

module.exports = router;
