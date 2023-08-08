import { NextFunction, Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import database from '../db/knex';
import { DbUser } from '../../types/DbUser';
import DBTodo from '../../types/DBTodo';
import { v4 } from 'uuid';
//import { errorHandler } from '../../middlewares';
import {
  handleSyntaxError,
  handleUserNotFoundError,
  handleUserNotExistinError,
  handleUnauthorizedError,
  handleForbiddenNotAdminError,
  handleDBInsertError,
  handleDBPasswordError,
  handleDBPromoteError,
  handleDBGetError,
  handlePasswordIncorrectEror,
  handleDBAdminCheckError
} from '../errorHandler';
import { uuid } from 'uuidv4';
import { V4MAPPED } from 'dns';
import { getTodoDB, addTodoToDB, deleteTodoDB, updateTodoDB, fetchTodosDB } from '../db/dbQuery';

export const post_todos = async (req: Request, res: Response) => {
  
  const userid = req.body?.user?.userid;

  if (userid == null)
    return handleSyntaxError("no user id ", res);

  try {
    const todos =  await getTodoDB(userid); // AWAIT PROMISE
    return res.status(200).json(todos || []);
  }


  catch (err) {
    return handleDBGetError("cant get data from DB ", res)
  }
}

export const addTodo = async (req: Request, res: Response) => {

  console.log(req.body)

  const userid = req.body?.user?.userid;
  const todo: DBTodo = req.body?.todo;

  if (userid == null)
    return handleSyntaxError("no user id ", res);

  if (todo == null)
    return handleSyntaxError("no todo ", res);
  
  try {
    let dbtodo: DBTodo = {
      todoid: v4(),
      todotitle: todo.todotitle,
      tododescription: todo.tododescription,
      todoisdone: todo.todoisdone,
      duedate: todo.duedate,
      userid: userid,
    };


  // if (dbtodo.userid==userid)
  //   return handleForbiddenNotAdminError("cant insert to DB ", res)
  //   console.log(dbtodo, todo)

    await addTodoToDB(dbtodo)

    return res.status(200).json(dbtodo);

  }
  catch (err) {
    console.log(err)
    return handleDBInsertError("cant insert to DB ", res)
  }



}
export const deleteTodo = async (req: Request, res: Response) => {
  const todoid: string = req.params.todoid;
  if (todoid == null)
    return handleSyntaxError("no user id ", res);


  try {

     await deleteTodoDB(todoid);

    return res.sendStatus(200)

  }
  catch (err) {
    console.log(err)
    return handleDBInsertError("cant insert to DB ", res)
  }
}


export const updateTodo = async (req: Request, res: Response) => {
  const todoid: string = req.params.todoid;
  if (todoid == null)
    return handleSyntaxError("no user id ", res);

  const userid = req.body?.user?.userid;
  const todo: DBTodo = req.body?.todo;

  if (userid == null)
    return handleSyntaxError("no user id ", res);

  if (todo == null)
    return handleSyntaxError("no todo ", res);

  try {
    let dbtodo = {
      todoid: todo.todoid,
      todotitle: todo.todotitle,
      tododescription: todo.tododescription,
      todoisdone: todo.todoisdone,
      duedate: todo.duedate,
      userid: userid,
    };

    console.log(dbtodo, todo)

    await updateTodoDB(dbtodo);

    return res.status(200).json(dbtodo);

  }
  catch (err) {
    console.log(err)
    return handleDBInsertError("cant insert to DB ", res)
  }
}
export const fetchTodos = async (req: Request, res: Response) => {


  const userid = req.body?.user?.userid;

  if (userid == null)
    return handleSyntaxError("no user id ", res);


  try {

    const todos = await fetchTodosDB(userid);

    return res.status(200).json(todos);
  }
  catch (err) {
    console.log(err)
    return handleDBInsertError("cant insert to DB ", res)
  }
}
