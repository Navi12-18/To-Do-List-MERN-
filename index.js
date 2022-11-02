import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/index.js';
import router from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 8080;

// app.use((err,req,res)=>{
//     const status = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';

//     return res.status(status).json({message, stack : err.stack});
// });

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

dotenv.config();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser());
app.use(router);

app.use('/api',allRoutes);

app.use("/hello", (req,res)=>{
    res.send('hello');
})

app.listen(PORT, ()=>{
    connectDB();
    console.log("Port is running at 8000");
});