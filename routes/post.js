const express = require('express');
const postController = require("../controllers/post");
const { verify, verifyAdmin } = require("../auth");


const router = express.Router();

// Create new blog post (authenticated users only)
router.post('/createPost', verify, userController.createPost);


module.exports = router;