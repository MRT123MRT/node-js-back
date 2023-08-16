import { NextFunction, Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import database from '../db/knex';
import { DbUser } from '../../types/DbUser';
import {DBTodo} from '../../types/DBTodo';
import { v4 } from 'uuid';
import { registerDB,loginDB } from '../db/dbQuery';
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


export const post_register = async (req: Request, res: Response) => {

  var username = req.body?.username;
  const password = req.body?.password;
  const email = req.body?.email;
  console.log(" i got  " + username)
  console.log(" i got   " + password)



  if (username === null)
    return handleSyntaxError("no username ", res);

  if (password == null)
    return handleSyntaxError("no password ", res);

  if (email == null)
    return handleSyntaxError("no email ", res);

  //if (!username.startsWith('admin') && password !== process.env.password)
  //username = "admin-" + username ;

  const user: DbUser = { username, password, email };

  try {

    await registerDB(user);

    console.log("inserted"+ user)
    //user created
    return res.sendStatus(201);

  } catch (err) {

    console.log(err);

    //username already exists
    return handleUnauthorizedError("username already exists ", res);
  }

};

export const post_login = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body?.username;
  const password = req.body?.password;
  console.log(req.body)

  if (username == null)
    return handleSyntaxError("username null ", res);


  if (password == null)
    return handleSyntaxError("passwoed null ", res);

  try {
    const user = await loginDB(username);
    console.log(user);


    if (!user) {

      return handleDBGetError("cant get data from DB to login ", res)
    };

    if (password === user.password) {

      //create jwt token with userid
      const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, { expiresIn: '30d' });

      return res.status(200).json({ username: user.username, token });
    }
    else
      return handlePasswordIncorrectEror("u cant login, wrong password ", res)

  }
  catch (err) {
    console.log(err)
  }
}

