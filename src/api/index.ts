import express from 'express';  
import { router as u } from './http/routes/user';
import { router as t } from './http/routes/Todos';
export const router = express.Router();

  
router.use('/', u);
router.use('/', t);
// ad prefix to all routes
//router.prefix = '/api';

export default router;
