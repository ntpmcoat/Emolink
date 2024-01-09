import Post from "../Models/addPost.js";

export const addPost=async(req,res)=>{
    try {
        const image = req.file;
    
        const postData = {
          caption: req.body.caption,
          image: {
            data: image.buffer,
            contentType: image.mimetype,
          },
        };
    
        const newPost = new Post(postData);
        await newPost.save();
    
        res.json({ message: 'Post added successfully' });
      }  catch (error) {
        console.error('Error adding post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};


export const fetchPost=async(req,res)=>{
  try{
    const posts=await Post.find();
    res.status(200).json(posts);
  }catch(error){
    console.error('Error fetching posts:',error);
    res.status(500).json({error:"Internal Server Error"});
  }
}

