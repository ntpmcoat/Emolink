import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import auth from './routes/auth.js';
import addPost from './routes/addPost.js';
import getPost from './routes/getPost.js';


config();

const app=express();

app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));

const storage=multer.memoryStorage();
const  upload=multer({storage:storage});

app.use('/api/addPost',upload.single('image'),addPost);

app.use('/api/getPost',getPost);





const CONNECTION_URL=process.env.MONGODB_URI;
const PORT=process.env.PORT || 5000

app.use(auth);


mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)))
.catch((error)=>console.log(error.message));

