const router = require("express").Router();
const {
  getAllPosts,
  createPost,
  deletePost,
  getPostByUserId,
} = require("../controllers/postController");
const { isAdmin } = require("../middlewares/userRole");
const { auth } = require("../middlewares/auth");

// /api/posts
router
  .route("/")
  .get([auth, isAdmin], getAllPosts) //only admin can view all posts
  .post([auth], createPost); //only logged in users can create posts

// /api/posts/:postId
router.route("/:postId").delete([auth], deletePost); //only logged in users can delete their posts

// /api/posts/:userId
router.route("/:userId").get([auth], getPostByUserId); //only logged in users can view their posts

module.exports = router;
