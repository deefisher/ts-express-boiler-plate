import { Application } from 'express';
import { ResponseHandler } from '../controllers/responseHandler.utils';
import mongoose = require('mongoose');

export interface RecordPackage {
    mongooseInstance: typeof mongoose;
    modelName: string;
    recordPayload: {};
}

export interface TestArgs {
    appInstance: Application;
    reqType: string;
    endpoint: string;
    testResponse: {};
    testPayload?: {};
    mockResponseHandler?: typeof ResponseHandler | undefined;
    recordPackage?: RecordPackage;
    param?: string;
}
