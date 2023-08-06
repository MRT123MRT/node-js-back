import express from 'express';  
import { router as u } from './http/routes/user';
import { router as r } from './http/routes/Todos';
export const router = express.Router();

  
router.use('/todos', r);
router.use('/', u);
// ad prefix to all routes
//router.prefix = '/api';

export default router;
