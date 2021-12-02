import { Application } from 'express';
import { ResponseHandler } from '../controllers/responseHandler.utils';

export interface TestArgs {
    appInstance: Application;
    reqType: string;
    endpoint: string;
    testResponse: {};
    testPayload: {};
    mockResponseHandler?: typeof ResponseHandler | undefined;
}
