import { NextFunction, Request, Response } from 'express';

const createErrorHandler = (statusCode: number, errorMessage: string) => {
  return (err: any, res: Response) => {
    console.error('Error:', err);
    res.status(statusCode).json({ error: errorMessage });
  };
};

export const handleSyntaxError = createErrorHandler(400, 'Invalid JSON');
export const handleUserNotFoundError = createErrorHandler(401, "User wasnt found");
export const handleUserNotExistinError = createErrorHandler(401, "User doesn't exist");
export const handlePasswordIncorrectEror= createErrorHandler(401, "wrong password");
export const handleUnauthorizedError = createErrorHandler(401, ' user exist');
export const handleForbiddenNotAdminError = createErrorHandler(403, 'FORBIDDEN - User is not an admin');
export const handleDBInsertError = createErrorHandler(500, 'Error inserting data');
export const handleDBGetError = createErrorHandler(500, 'Error geting data');
export const handleDBPasswordError = createErrorHandler(500, 'Error retrieving password');
export const handleDBPromoteError = createErrorHandler(500, 'Error in DB promoting user to admin');
export const handleDBAdminCheckError = createErrorHandler(500, 'Error checking if user is admin');