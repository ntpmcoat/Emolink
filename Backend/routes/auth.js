import express from 'express';
import { registerUser, loginUser } from '../controllers/User.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get(console.log("Hello"))

export default router;
