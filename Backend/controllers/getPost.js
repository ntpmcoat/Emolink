import Post from "../Models/addPost.js";
export const fetchPost=async(req,res)=>{
    try{
      const posts=await Post.find();
      res.status(200).json(posts);
    }catch(error){
      console.error('Error fetching posts:',error);
      res.status(500).json({error:"Internal Server Error"});
    }
  }