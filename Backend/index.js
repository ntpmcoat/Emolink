import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import auth from './routes/auth.js';
import addPost from './routes/addPost.js';
import getPost from './routes/getPost.js';
import analyticsRouter from './routes/analytics.js';
import profileRouter from './routes/profile.js';
import chatRoute from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import setupSocketIO from './config/socket.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  },
});

app.use(bodyParser.json());
app.use(cors());


// Set up Socket.io with the server
setupSocketIO(io);

// Define routes after Socket.io setup
app.use(auth);
app.use('/chat', chatRoute);
app.use('/message', messageRouter);
app.use('/api/addPost', multer({ storage: multer.memoryStorage() }).single('image'), addPost);
app.use('/api/getPost', getPost);
app.use('/analytics', analyticsRouter);
app.use('/profile', profileRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/forgot-pass/:token', (req, res) => {
  res.sendFile(path.join(__dirname, 'components/forgotpass', 'forgot.html'));
});

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => server.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
