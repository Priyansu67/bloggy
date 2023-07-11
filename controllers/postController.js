const Post = require("../models/postModel.js");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ authorId: userId });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      authorId: req.user._id,
      authorName: req.user.username,
      date: new Date().toISOString(),
      ...req.body,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const updatePost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

 const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.status(200).json({
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, getPostByUserId, createPost, deletePost };
