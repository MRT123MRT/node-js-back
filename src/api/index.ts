import express from 'express';  
import { router as u } from './routes/user';
import { router as r } from './routes/array';
export const router = express.Router();

  
router.use('/array', r);
router.use('/', u);

export default router;
