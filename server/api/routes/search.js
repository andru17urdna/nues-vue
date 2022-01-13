import express from "express";
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async(req,res) => {
    const params = req.query.tags;

    const response = await fetch(`https://newsapi.org/v2/everything?q=${params}&apiKey=${process.env.API_KEY}`)
    const data = await response.json();
    res.send(data);
})

export default router;
