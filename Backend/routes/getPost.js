import  express  from "express";
import { fetchPost } from "../controllers/getPost.js";

const router=express.Router();

router.get('/getPost',fetchPost);

export default router;
