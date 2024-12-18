import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import authRoutes from './routes/auth.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';  
dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Mongodb is connected')
}).catch((err)=>{console.log(err)})


const app=express();
app.listen(3000,()=>{
    console.log('server is runing');
})
app.use(express.json());
app.use(cookieParser());
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:;");
    next();
  });
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error'; 
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });

});
