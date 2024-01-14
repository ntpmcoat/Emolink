import Post from '../Models/addPost.js'; // Adjust the path based on your project structure
import Register from '../Models/User.js'; // Adjust the path based on your project structure

export const addPost = async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: 'Image not provided' });
    }

    // Fetch username from Register model based on email
    const email = req.body.email; // Assuming the email is sent in the request body
    const user = await Register.findOne({ email });
    const author = user ? user.username : 'DefaultAuthor'; // Use a default author if not found

    const postData = {
      author,
      caption: req.body.caption,
      image: {
        data: image.buffer,
        contentType: image.mimetype,
      },
      likes: 0,
      comments: [],
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
