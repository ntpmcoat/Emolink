import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer, // Store binary image data
    contentType: String, // Store the content type of the image (e.g., 'image/jpeg')
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
