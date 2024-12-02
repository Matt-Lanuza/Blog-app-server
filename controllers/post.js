const Post = require("../models/Post");

// Create new blog post (authenticated users only)
module.exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const newPost = new Post({
      title,
      content,
      author,
    });

    await newPost.save();
    res.status(201).send({ message: "Post created successfully", newPost });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};