import { User } from '@okta/okta-sdk-nodejs';
import { Request, Response } from 'express';
import { AuthClient } from '../authClient';
import { ResponseHandler } from './responseHandler.utils';
const okta = require('@okta/okta-sdk-nodejs');

export class UsersController {
    responseHandler: ResponseHandler = new ResponseHandler();
    client: typeof okta.Client = AuthClient.getInstance();

    createUser(req: Request, res: Response) {
        return this.client
            .createUser(req.body)
            .then((result: User) => {
                this.responseHandler.jsonRes(result, res);
            })
            .catch((err: Error) => {
                this.responseHandler.errRes(err, res, 'Failed to create user');
            });
    }
}
