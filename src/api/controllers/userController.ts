import { Request, Response } from 'express';
import express from 'express';
import jwt from 'jsonwebtoken';
import database from '../../../knex';
import  DbUser from '../../types/DbUser';

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

 
export const post_register = async(req: Request, res: Response) =>  {

        const username = req.body?.username;
        const password = req.body?.password;
      
      
        if (!username == null)
          return res.sendStatus(400);
      
        if (password == null)
          return res.sendStatus(400);
      
      
        if (username.startsWith('admin') && password !== process.env.password)
          return res.sendStatus(403);
      
        let user =DbUser(username, password);
      
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
          return res.sendStatus(401);
        }
      
      };
      
 export const post_login = async(req: Request, res: Response) => {
    const username = req.body?.username;
    const password = req.body?.password;
  
    if (username == null)
      return res.sendStatus(400);
  
  
    if (password == null)
      return res.sendStatus(400);
  
  
  
  
    try {
  
  
      const user = await database('users').where('username', username).first();
  
      if (!user)
        return res.sendStatus(401);
  // להכניס את הpassword check  בשליפה
  
      if (password === user.password) {
  
        //create jwt token with userid
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
        return res.status(200).json({ username: user.username, token });
      }
      else
        return res.sendStatus(401);
  
  
  
    } catch (err) {
      console.log(err);
      return res.sendStatus(401);
    }
 }

    export const promote = async(req: Request, res: Response) => {
    if ((req.body.user.username as string).startsWith('admin') == false)
        return res.sendStatus(403);
        
    if(req.body.username == null || req.body.username.startsWith('admin') == true)
        return res.sendStatus(400); 

    try {
        let user = await database('users').where('username', req.body.username).first();
        user.username = 'admin_' + user.username;

        await database('users').where('username', req.body.username).update(user)

        res.status(200).json({ username: user.username });
    }
    catch
    {
        res.sendStatus(400);
    }
};



