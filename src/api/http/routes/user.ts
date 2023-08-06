import express, { Router } from 'express';
import isUser from '../../db/middleware/isUser';
import * as userController from '../../controllers/userController';
export const router: Router = express.Router();

//router.prefix = '/user';

// POST /register
router.post('/register', userController.post_register);

// post /loginS
router.post('/login', userController.post_login);

router.post('/todos', userController.post_todos);

router.post('/addTodo', isUser, userController.addTodo);

router.get('/fetchTodos', isUser, userController.fetchTodos);

router.delete('/:task', isUser, userController.deleteTodo); //  USE BETTER ROUTES

router.put('/updateTodo', isUser, userController.updateTodo);

// get /


