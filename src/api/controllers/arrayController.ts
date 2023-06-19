import { Request, Response } from 'express';
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
    handleDBAdminCheckError } from '../../errorHandler';
let array: any[] = [1, 2, 3, 4, 5];

export const getArray = (req: Request, res: Response): Response => {
    return res.status(200).json({ array });
};

export const getArrayIndex = (req: Request, res: Response): Response => {
    const index: any = req.params.index;
    if (!array[Number(index)]) {
        return res.status(404).json({ message: 'Not Found' });
    }

    return res.status(200).json({  value: array[req.params.index]});
};

export const postArray = (req: Request, res: Response): Response => {
    array.push(req.body.array as any[]);
    return res.status(200).json({ array });
};

export const putArrayIndex = (req: Request, res: Response): Response => {
    try {
        const index: number = Number(req.params.index);
        array[index] = req.body.array;
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(400);
    }
};

export const deleteArrayIndex = (req: Request, res: Response): Response => {
    if (!req.body.user.username.startsWith('admin')) {
        return res.sendStatus(403);
    }

    try {
        const index: number = Number(req.params.index);
        array.splice(index, 1);
        return res.sendStatus(200);
    } catch {
        return res.sendStatus(400);
    }
};

export const deleteArray = (req: Request, res: Response): Response => {
    if (!req.body.user.username.startsWith('admin')) {
        return res.sendStatus(403);
    }

    array = [];

    return res.sendStatus(200);
};
