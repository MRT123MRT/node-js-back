import { NextFunction, Request, Response } from 'express';
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
    handleDBAdminCheckError } from '../errorHandler';
let array: any[] = [1, 2, 3, 4, 5];

export const getArray = (req: Request, res: Response): Response => {
    return res.status(200).json({ array });
};

export const getArrayIndex = (req: Request, res: Response): Response => {
    const index: any = req.params.index;
    if (!array[Number(index)]) {
        handleNotFoundError("---------------\ncant find num in array\n--------------", res)
    }

    return res.status(200).json({  value: array[req.params.index]});
};

export const postArray = (req: Request, res: Response): Response => {
    array.push(req.body.array as any[]);
    return res.status(200).json({ array });
};

export const putArrayIndex = (req: Request, res: Response) => {
    try {
        const index: number = Number(req.params.index);
        array[index] = req.body.array;
        return res.sendStatus(200);
    } catch(err) {
           return handleDBInsertError("---------------\nerror in putArrayIndex\n--------------", res);
    }
}; 

export const deleteArrayIndex = (req: Request, res: Response) => {
    try {
        const index: number = Number(req.params.index);
        array.splice(index, 1);
        return res.sendStatus(200);
    } catch {
        return handleSyntaxError( 'Error deleting data', res);
    }
};

export const deleteArray = (req: Request, res: Response) => {

    array = [];

    return res.sendStatus(200);
};
