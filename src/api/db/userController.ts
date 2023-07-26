import { NextFunction, Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import database from './knex';
import { DbUser } from '../../types/DbUser';
//import { errorHandler } from '../../middlewares';
import { handleSyntaxError,
         handleUserNotFoundError,
         handleUserNotExistinError,
         handleUnauthorizedError,
         handleForbiddenNotAdminError, 
         handleDBInsertError,
         handleDBPasswordError,
         handleDBPromoteError,
         handleDBGetError,
         handlePasswordIncorrectEror,
         handleDBAdminCheckError } from '../errorHandler';

export const get_ = (req: Request, res: Response): Response => {
  return res.status(200).json({
    msg: `Hello ${req.body.user.username} today is ${new Date().toDateString()} `
  });
};

export const get_getUser = (req: Request, res: Response): Response => {
  return res.status(200).json(req.body.user);
};

export const getEcho = (req: Request, res: Response): Response => {
  return res.status(200).json({
    msg: `The message is ${req.query.msg}`
  });
};


export const post_register = async (req: Request, res: Response) => {

  var username = req.body?.username;
  const password = req.body?.password;


  if (username === null)
  return handleSyntaxError("no username ", res);

  if (password == null)
  return handleSyntaxError("no password ", res);


  if (!username.startsWith('admin') && password !== process.env.password)
    username = "admin-" + username ;

  const user: DbUser = { username, password };

  try {

    await database('users').insert({
      username: user.username,
      password: user.password,
    });

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

  if (username === null)
    return handleSyntaxError("username null ", res);


  if (password === null)
    return handleSyntaxError("passwoed null ", res);  


    const user = await database('users').where('username', username).first();

    if (!user) {
      return handleDBGetError("cant get data from DB to login ", res)
    };

    if (password === user.password) {

      //create jwt token with userid
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      return res.status(200).json({ username: user.username, token });
    }
    else
      return handlePasswordIncorrectEror("u cant login, wrong password ", res)




}

export const promote = async (req: Request, res: Response) => {

  console.log("abcccccccccccccccccccccccccccccccccc")
  if ((req.body.user.username as string).startsWith('admin') == false)
    return handleForbiddenNotAdminError("not admin ", res)


  if (req.body.username === null)
  return handleSyntaxError("not admin ", res)

  try {
    let user = await database('users').where('username', req.body.username).first();
    user.username = 'admin_' + user.username;

    await database('users').where('username', req.body.username).update(user)

    res.status(200).json({ username: user.username });
  }
  catch
  {
    return handleDBPromoteError("cant update to admin ", res)
  }
};



