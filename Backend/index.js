import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import auth from './routes/auth.js';
import addPost from './routes/addPost.js';
import getPost from './routes/getPost.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import analyticsRouter from './routes/analytics.js';
import profileRouter from './routes/profile.js';
config();

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/api/addPost', upload.single('image'), addPost);
app.use('/api/getPost', getPost);
app.use('/analytics',analyticsRouter);
app.use('/profile',profileRouter)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get('/forgot-pass/:token', (req, res) => {
    res.sendFile(path.join(__dirname, 'components/forgotpass', 'forgot.html'));
});

const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.use(auth);

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
