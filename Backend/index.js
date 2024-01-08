import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import auth from './routes/auth.js'

config();

const app=express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());


const CONNECTION_URL=process.env.MONGODB_URI;
const PORT=process.env.PORT || 5000

app.use('/api/auth', auth);


mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)))
.catch((error)=>console.log(error.message));

