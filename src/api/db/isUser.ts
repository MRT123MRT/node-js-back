import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import database from './knex';

export default async function isUser(req: Request, res: Response, next: NextFunction) {

    if (!req.headers.authorization)
        return res.sendStatus(401);


    const token = req.headers.authorization.split(' ')[1];

    if (token === null)
        return res.sendStatus(401);

    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload)
            return res.sendStatus(401);


        req.body.user = await database.from('users').where('id', payload.id).first();

        //console.log(req.body.user);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(401);
    }

    next();
}