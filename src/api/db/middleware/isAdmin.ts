import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import database from '../knex';
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
    handleNotFoundError,
    handleDBAdminCheckError } from '../../errorHandler';

export default async function isAdmin(req: Request, res: Response, next: NextFunction) {
        console.log("fdfdfdffffffffffffffffffffffffffff/nffdfffffffffffff/nfdfdfdffff")
     const user = req.body.user;

        console.log( user );
     if (user.username.startsWith('admin')===false)
        return handleForbiddenNotAdminError("not admin", res);


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
         handleDBAdminCheckError("Error checking if user is admin in DB", res)
    }

    next();
}