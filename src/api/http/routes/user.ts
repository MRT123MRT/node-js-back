import express, { Router } from 'express';
import isUser from '../../db/middleware/isUser';
import * as userController from '../../controllers/userController';
export const router: Router = express.Router();
import *as TodoController from '../../controllers/TodosController';
//router.prefix = '/user';

// POST /register
router.post('/register', userController.post_register);

// post /loginS
router.post('/login', userController.post_login);



