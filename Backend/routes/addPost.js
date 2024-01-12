import express from "express";
import { addPost} from "../controllers/addPost.js";

const router=express.Router();

router.post('/addPost',addPost);

export default router;