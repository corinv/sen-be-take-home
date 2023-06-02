import { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
// import * as authService from '../service/auth.service';
import { AuthParams } from '../interfaces/auth.interface';
import { ApplicationError } from '../middleware/errors';

export const authenticateUser = async (req: Request<{}, {}, AuthParams>, res: Response, next: NextFunction) => {
    // TODO: Implement user authentication
}