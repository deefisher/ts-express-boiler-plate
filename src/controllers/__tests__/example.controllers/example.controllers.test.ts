import { env } from '../../../environment/env';
import { app } from '../../../jestTestSetup';
import { baseExampleUrl } from '../../../routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ResponseHandler } from '../../responseHandler.utils';
import { db } from './utils/db';
import { messageStrings } from '../../base.controller';
import { generateMongo500Test, generateMongoSuccessTest } from '../utils/mongo.test.utils';
const mongoose = require('mongoose');

jest.mock('../../responseHandler.utils', function () {
    const { ResponseHandler: mockResponseHandler } = jest.requireActual('../../responseHandler.utils');
    return { ResponseHandler: mockResponseHandler };
});

const callUrl: string = `${env.apiPath}${baseExampleUrl}`;

describe(`example.controllers`, () => {
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri, { useNewUrlParser: true });
    });

    afterAll(async () => {
        await mongod.stop();
        await mongoose.connection.close();
    });

    describe(`and POST createRecord`, () => {
        beforeEach(() => {
            jest.spyOn(console, 'log').mockImplementation(() => {});
        });

        it(
            'should return 200 & valid success response',
            generateMongoSuccessTest({
                appInstance: app,
                reqType: 'post',
                endpoint: callUrl,
                testPayload: db.createRecord.payload,
                testResponse: db.createRecord.successfulResponse,
            }),
        );

        it(
            'should return 500 & promise error response',
            generateMongo500Test({
                appInstance: app,
                reqType: 'post',
                endpoint: callUrl,
                testPayload: db.createRecord.payload,
                testResponse: { error: messageStrings.failedToCreate },
                mockResponseHandler: ResponseHandler,
            }),
        );

        it(
            'should handle 500 incorrect payload',
            generateMongo500Test({
                appInstance: app,
                reqType: 'post',
                endpoint: callUrl,
                testPayload: db.createRecord.invalidPayload,
                testResponse: { error: db.createRecord.failureResponse },
                mockResponseHandler: ResponseHandler,
            }),
        );
    });
});
