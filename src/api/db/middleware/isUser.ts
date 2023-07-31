import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import database from '../knex';
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
    handleNotFoundError,
    handleTokenInvalidError,
    handleDBAdminCheckError
} from '../../errorHandler';

export default async function isUser(req: Request, res: Response, next: NextFunction) {

    if (!req.headers.authorization)
        return handleSyntaxError("no header authorization ", res)


    const token = req.headers.authorization.split(' ')[1];

    if (token === null)
        return handleTokenInvalidError("no token ", res);
    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload)
            return handleTokenInvalidError("no token ", res);

        req.body.user = await database.from('users').where('userid', payload.id).first();

        //console.log(req.body.user);
    }
    catch (err) {
        console.log(err);
        return handleDBGetError("error in db ", res);
    }

    next();
}