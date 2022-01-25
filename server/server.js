import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import apiRoutes from './api/index.js';
import idGenerator from './middleware/idGenerator.js';


dotenv.config();
// console.log(process.env.API_KEY)

const app = express();
const port = 8000;


app.use(idGenerator);
app.use(cors());
app.use(apiRoutes);

app.listen(port, () => console.log(`Party on Port:${port}!`))

export default app;
