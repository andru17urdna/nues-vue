import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import idGenerator from './middleware/idGenerator.js';
import apiRoutes from './routes/index.js';



dotenv.config();


const app = express();


app.use(idGenerator);
app.use(cors());
app.use(apiRoutes);


app.get('/',(req,res)=>{
    res.json({message:"hello there"})
 })


export default app;
