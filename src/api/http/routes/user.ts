import express, { Router } from 'express';
import isAdmin from '../../db/middleware/isAdmin';
import isUser from '../../db/middleware/isUser';
import * as userController from '../../db/userController';
export const router: Router = express.Router();


// POST /register
router.post('/register', userController.post_register);

// post /loginS
router.post('/login', userController.post_login);

// get /
router.get('/', isUser, userController.get_);

// get /getUser
router.get('/getUser', isUser, userController.get_getUser);

// get /getecho
router.get('/echo', isUser, userController.getEcho);

// get /promote
router.get('/promote', isAdmin, isUser, userController.promote);
