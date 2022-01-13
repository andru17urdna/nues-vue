import express from "express";
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async(req,res) => {
    const params = req.query.tags;

    console.log("searchRoute '/'", params)
    console.log(process.env.API_KEY)

    const response = await fetch(`https://newsapi.org/v2/everything?q=${params}&apiKey=${process.env.API_KEY}`)
    const data = await response.json();
    console.log(data);
    res.send(data);
})

export default router;
