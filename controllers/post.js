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
		const { title, content, author } = req.body;

		let newUpdatedPost = {
			title,
			content,
			author
		}

		const updatedPost = await Post.findByIdAndUpdate(postId, newUpdatedPost, {new: true});
		if(!updatedPost){
			return res.status(404).send({ error: 'No post found' });
		}

		res.status(200).send({
			message: 'Post updated successfully',
			updatedPost
		})


	} catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
  }
};


// Delete a post by ID (authenticated user)
module.exports.deletePost = async (req, res) => {
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