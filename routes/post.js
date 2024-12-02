const express = require('express');
const postController = require("../controllers/post");
const { verify, verifyAdmin } = require("../auth");


const router = express.Router();

// Create new blog post (authenticated users only)
router.post('/createPost', verify, userController.createPost);

// Get all posts (all users)

// Get a post by ID (all users)

// Update a post by ID (authenticated user)

// Delete a post by ID (authenticated user)

// Delete any post by ID (admin user)

// Delete any comments by ID (admin user)

// Add comment on a post by ID (authenticated user)

// Get all comments on a post by ID (authenticated user)

module.exports = router;