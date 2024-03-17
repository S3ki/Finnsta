const mongoose = require("mongoose");
const Post = require("../models/postSchema");

const getAllPosts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const posts = await Post.find({user_id});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, text } = req.body;
  try {
    const user_id = req.user._id;
    const newPost = new Post({title, text, user_id});
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post!" });
  }

  try {
    const user_id = req.user._id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "No such post" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }
  try {
    const user_id = req.user._id;
    const post = await Post.findByIdAndDelete({ _id: id, user_id: user_id });
    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  try {
    const user_id = req.user._id;
    const post =  await Post.findByIdAndUpdate(
      { _id: id, user_id: user_id },
      { ...req.body },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Fitness not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
};
