import express, { Router } from 'express';
import isUser from '../../db/middleware/isUser';
import * as TodoController from '../../controllers/TodosController';

export const router: Router = express.Router();

// GET /array
//router.post('/', TodoController.post_todos);

router.post('/', TodoController.addTodo);

router.get('/', TodoController.fetchTodos);

router.delete('/:todoid', TodoController.deleteTodo); //  USE BETTER ROUTES :/task id

router.put('/:todoid', TodoController.updateTodo);