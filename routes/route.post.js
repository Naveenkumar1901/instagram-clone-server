const {
  addPost,
  getAllPosts,
  deletePost,
  likePost,
  commentPost,
} = require("../controllers/controller.post");
const { upload } = require("../middlewares/multer");

const router = require("express").Router();

router.get("/allPosts", getAllPosts);
router.post("/addpost", upload.single("imgUrl"), addPost);
router.delete("/deletePost", deletePost);
router.patch("/likePost", likePost);
router.patch("/commentPost", commentPost);

module.exports = router;
