import express, { Router } from 'express';
import isUser from '../../db/middleware/isUser';
import * as TodoController from '../../controllers/TodosController';

export const router: Router = express.Router();

router.use(isUser)
// GET /array
router.post('/todos', TodoController.post_todos);

router.post('/addTodo', isUser, TodoController.addTodo);

router.get('/fetchTodos', isUser, TodoController.fetchTodos);

router.delete('/:task', isUser, TodoController.deleteTodo); //  USE BETTER ROUTES

router.put('/updateTodo', isUser, TodoController.updateTodo);