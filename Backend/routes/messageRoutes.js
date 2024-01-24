import express from 'express';
const messageRouter=express.Router()
import { sendMessage,allMessages } from '../controllers/messageController.js';
import protect from '../Middleware/auth.js';

messageRouter.route('/').post(protect,sendMessage);
messageRouter.route('/:chatId').get(protect,allMessages)

export default messageRouter;