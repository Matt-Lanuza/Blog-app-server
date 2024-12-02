const Post = require("../models/Post");

// Create new blog post (authenticated users only)
module.exports.createPost = async (req, res) => {
  try {
	    const { title, content } = req.body;
	    const userName = req.user.username;

	    if (!title || !content) {
	      return res.status(400).send({ error: "All fields are required" });
	    }

	    const newPost = new Post({
	      title,
	      content,
	      author: userName,
	    });

	    await newPost.save();
	    res.status(201).send( newPost );
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



// Update a post by ID (authenticated user)
module.exports.editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userName = req.user.username; 

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ error: 'No post found' });
    }

    // Ensure that only the owner or an admin can update the post
    if (post.author !== userName && !req.user.isAdmin) {
      return res.status(403).send({ error: 'You are not authorized to update this post' });
    }

    const updatedPostData = {
      title,
      content,
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

    // Find the post by ID
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).send({ error: 'No post found' });
    }

    // Check if the authenticated user is the owner of the post
    if (post.author.toString() !== userId) {
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

		const deletedPost = await Post.findByIdAndDelete(postId)
		if(!deletedPost){
			return res.status(404).send({ error: 'No post found' });
		}

		res.status(200).send({message: 'Post deleted successfully'});

	} catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};