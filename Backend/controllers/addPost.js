import Post from "../Models/addPost.js";

export const addPost = async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: 'Image not provided' });
    }

    const postData = {
      author: 'ReplaceWithAuthorName', 
      caption: req.body.caption,
      image: {
        data: image.buffer,
        contentType: image.mimetype,
      },
      likes: 0, 
      comments: [], // Initialize comments as an empty array
      shares: 0, 
    };

    const newPost = new Post(postData);
    await newPost.save();

    res.json({ message: 'Post added successfully' });
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};