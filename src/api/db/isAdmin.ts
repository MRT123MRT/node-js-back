import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import database from './knex';


export default async function isAdmin(req: Request, res: Response, next: NextFunction) {

     const user = req.body.user;

    
     if (user.Username.startsWrith('admin')===false)
        return res.status(401).json({
         data: 'token invalid',
         status: 'Unauthorized',
     });


    if (!req.headers.authorization)
        return res.status(401).json({
            data: 'token invalid',
            status: 'Unauthorized',
        });

    const token = req.headers.authorization.split(' ')[1];

    if (token === null)
        return res.status(401).json({
            data: 'token invalid',
            status: 'Unauthorized',
        });

    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload)
            return res.status(401).json({
                data: 'token invalid',
                status: 'Unauthorized',
            });

        req.body.user = await database.from('users').where('id', payload.id).first();

        //console.log(req.body.user);
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            data: 'token invalid',
            status: 'Unauthorized',
        });
    }

    next();
}