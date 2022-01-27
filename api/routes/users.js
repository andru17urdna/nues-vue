import express from "express";
import { readFile } from 'fs/promises';

const router = express.Router();

router.get('/user-data', async(req,res) => {
    const json = JSON.parse(await readFile(new URL('../data-json/user-info.json', import.meta.url)));
    res.send(json);
});

export default router;
