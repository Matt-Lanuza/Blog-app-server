const express = require('express');
const postController = require("../controllers/post");
const { verify, verifyAdmin } = require("../auth");


const router = express.Router();

// Create new blog post (authenticated user)
router.post('/createPost', verify, postController.createPost);

// Get all posts (all users)
router.get('/getAllPosts', postController.getAllPosts);

// Get a post by ID (all users)
router.get('/getPost/:id', postController.getPost);

// Get my posts (authenticated user)
router.get('/getMyPosts', verify, postController.getMyPosts);

// Update a post by ID (authenticated user)
router.put('/editPost/:id', verify, postController.editPost);

// Delete a post by ID (authenticated user)
router.delete('/deletePost/:id', verify, postController.deletePost);

// Delete any post by ID (admin user)
router.delete('/adminDeletePost/:id', verify, verifyAdmin, postController.adminDeletePost);

// Add comment on a post by ID (authenticated user)
router.patch('/addComment/:id', verify, postController.addComment);

// Get all comments on a post by ID (authenticated user)
router.get('/getComments/:id', postController.getComments);

// Delete any comments by ID (admin user)
router.delete('/adminDeleteComment/:postId/:commentId', verify, verifyAdmin, postController.adminDeleteComment);

module.exports = router;