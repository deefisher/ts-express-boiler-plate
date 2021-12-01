import { Request, Response } from 'express';
import { ZodError, ZodObject } from 'zod';
import { IAuthClient } from '../types/user.interface';
import { ResponseHandler } from './responseHandler.utils';

export class UsersController {
    responseHandler: ResponseHandler = new ResponseHandler();
    constructor(public client: IAuthClient, public newUserProfileSchema: ZodObject<any>) {}

    async createUser(req: Request, res: Response) {
        return this.newUserProfileSchema
            .parseAsync(req.body)
            .then(() => {
                return this.client
                    .createUser(req.body)
                    .then((result) => {
                        this.responseHandler.jsonRes(result, res);
                    })
                    .catch((err: Error) => {
                        this.responseHandler.errRes(err, res);
                    });
            })
            .catch((err: ZodError) => {
                console.log('res', res);
                this.responseHandler.errRes(err, res, 'Invalid payload', 400);
            });
    }
}
