import { Request, Response } from 'express';
import { IAuthClient } from '../types/user.interface';
import { ResponseHandler } from './responseHandler.utils';

export class UsersController {
    responseHandler: ResponseHandler = new ResponseHandler();
    constructor(public client: IAuthClient) {}

    createUser(req: Request, res: Response) {
        return this.client
            .createUser(req.body)
            .then((result) => {
                this.responseHandler.jsonRes(result, res);
            })
            .catch((err: Error) => {
                this.responseHandler.errRes(err, res, 'Failed to create user');
            });
    }
}
