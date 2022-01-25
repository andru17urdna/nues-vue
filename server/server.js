import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import apiRoutes from './api/index.js';
import idGenerator from './middleware/idGenerator.js';


dotenv.config();
// console.log(process.env.API_KEY)

const app = express();


app.use(idGenerator);
app.use(cors());
app.use(apiRoutes);


export default app;
