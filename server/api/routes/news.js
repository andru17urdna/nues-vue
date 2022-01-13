import express from "express";
import { readFile } from 'fs/promises';

const router = express.Router();

router.get('/user-favorites', async (req, res) => {
    const json = JSON.parse(await readFile(new URL('../../data-json/cnn-news.json', import.meta.url)));
    res.send(json);
});

router.get('/top-headlines', async (req, res) => {
    const json = JSON.parse(await readFile(new URL('../../data-json/top-headlines.json', import.meta.url)));
    res.send(json);
})


export default router;
