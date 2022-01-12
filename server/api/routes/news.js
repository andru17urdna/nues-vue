import express from "express";
import { readFile } from 'fs/promises';

const router = express.Router();

router.get('/', async (req, res) => {
    const json = JSON.parse(await readFile(new URL('./cnn-news.json', import.meta.url)));
    res.send(json);
});


export default router;
