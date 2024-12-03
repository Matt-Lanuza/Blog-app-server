const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now, 
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  author: {
    type: String,
    required: [true, 'Author information is required'],
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
