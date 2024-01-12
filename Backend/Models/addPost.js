import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer, // Store binary image data
    contentType: String, // Store the content type of the image (e.g., 'image/jpeg')
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  timeAgo: {
    type: String,
    // You may want to use a library like moment.js to calculate time ago
  },
  // You might want to add fields for likes, comments, and shares
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      author: String,
      text: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shares: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
