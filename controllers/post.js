const Post = require("../models/Post");
const User = require('../models/User');

// Create new blog post (authenticated users only)
module.exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Find the user by ID and get the username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const newPost = new Post({
      title,
      content,
      author: user.username,
    });

    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// Get all posts (all users)
module.exports.getAllPosts = async (req, res) => {
	try {

		const posts = await Post.find({});

		if(posts.length === 0) {
			return res.status(404).send({ error: 'No posts found' });
		}

		res.status(200).send({ posts });


	} catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }


};



// Get a post by ID (all users)
module.exports.getPost = async (req, res) => {
	try {
		const postId = req.params.id;

		const post = await Post.findById(postId);

		if(!post) {
			return res.status(404).send({ error: 'No post found' });
		}

		res.status(200).send(post);


	} catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};


// Get my posts (authenticated user)
module.exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user from the User model using the userId from JWT
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const posts = await Post.find({ author: user.username });

    if (posts.length === 0) {
      return res.status(404).send({ error: 'No posts found' });
    }

    res.status(200).send(posts);


  } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};




// Update a post by ID (authenticated user)
module.exports.editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;

    // Find the user from the User model using the userId from JWT
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ error: 'No post found' });
    }

    // Ensure that only the owner or an admin can update the post
    if (post.author !== user.username) {
      return res.status(403).send({ error: 'You are not authorized to update this post' });
    }

    const updatedPostData = {
      title: title || post.title,
      content: content || post.content,
    };

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });
    
    res.status(200).send({
      message: 'Post updated successfully',
      updatedPost
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};



// Delete a post by ID (authenticated user)
module.exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Find the user from the User model using the userId from JWT
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ error: 'No post found' });
    }

    // Check if the authenticated user is the owner of the post
    if (post.author !== user.username) {
      return res.status(403).send({ error: 'You are not authorized to delete this post' });
    }

    // Delete the post by ID
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).send({ error: 'No post found to delete' });
    }

    res.status(200).send({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error while deleting post' });
  }
};



// Delete any post by ID (admin user)
module.exports.adminDeletePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const userId = req.user.id;

		// Find the user from the User model using the userId from JWT
		const user = await User.findById(userId);
		if (!user) {
		  return res.status(404).send({ error: 'User not found' });
		}

		// Check if the authenticated user is the owner of the post
		if (user.isAdmin !== true) {
		  return res.status(403).send({ error: 'You are not authorized to delete this post' });
		}


		// Find the post by ID
		const post = await Post.findById(postId);
		if (!post) {
		  return res.status(404).send({ error: 'No post found' });
		}

		await Post.findByIdAndDelete(postId);
		res.status(200).send({ message: 'Post deleted successfully' });

	} catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};


// Add comment on a post by ID (authenticated user)
module.exports.addComment = async (req, res) => {
	try {

		const postId = req.params.id;
		const userId = req.user.id;
		const { comment } = req.body;


		// Check if comment is provided
		if (!comment) {
		  return res.status(400).send({ error: 'Comment cannot be empty' });
		}

		// Find the user from the User model using the userId from JWT
		const user = await User.findById(userId);
		if (!user) {
		  return res.status(404).send({ error: 'User not found' });
		}

		// Find the post by ID
		const post = await Post.findById(postId);
		if (!post) {
		  return res.status(404).send({ error: 'Post not found' });
		}


		let newComment = {
			userId,
			userName: user.username,
			comment
		}

		const updatedPost = await Post.findByIdAndUpdate( 
				postId,
				{ $push: { comments: newComment } },
				{ new: true}
			);

		res.status(200).send({
			message: 'Comment added successfully',
			updatedPost
		});



	} catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};




// Get all comments on a post by ID (authenticated user)
module.exports.getComments = async (req, res) => {
	try {
		const postId = req.params.id;

		// Find the post
		const post = await Post.findById(postId);
		if(!post) {
			return res.status(404).send({ error: 'No post found' });
		}

		let getAllComments = post.comments;
		res.status(200).send({comments: getAllComments});

	} catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};

// Delete any comments by ID (admin user)
module.exports.adminDeleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    // Check if the user is an admin
    const user = await User.findById(userId);
    if (!user || user.isAdmin !== true) {
      return res.status(403).send({ error: "You are not authorized to delete comments" });
    }

    // Find the post by its ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }


    // Find the index of the comment to delete
    const commentIndex = post.comments.findIndex((comment) => comment._id === commentId);
    if (commentIndex === -1) {
      return res.status(404).send({ error: "Comment not found" });
    }

    // Remove the comment from the post's comments array
    post.comments.splice(commentIndex, 1);

    // Save the updated post
    await post.save();

    res.status(200).send({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};
