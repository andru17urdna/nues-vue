import express from 'express';
import newsRouter from './news.js';
import searchRouter from './search.js';

const router = express.Router();

router.use('/news', newsRouter );
router.use('/search', searchRouter);

export default router;
