import express from "express";
import { addPost,fetchPost } from "../controllers/addPost.js";

const router=express.Router();

router.post('/addPost',addPost);
router.get('/fetchPost',fetchPost);

export default router;