import express from 'express';
import newsRouter from './news.js';
import searchRouter from './search.js';
import userRouter from './users.js';

const router = express.Router();

router.use('/news', newsRouter );
router.use('/search', searchRouter);
router.use('/users', userRouter);

export default router;
