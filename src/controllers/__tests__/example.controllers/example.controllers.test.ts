import { env } from '../../../environment/env';
import { app } from '../../../jestTestSetup';
import { baseExampleUrl } from '../../../routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ResponseHandler } from '../../responseHandler.utils';
import { db } from './utils/db';
import { messageStrings } from '../../base.controller';
import { failedMessage } from '../../example.controller';
const mongoose = require('mongoose');

const request = require('supertest');

jest.mock('../../responseHandler.utils', function () {
    const { ResponseHandler: mockResponseHandler } = jest.requireActual('../../responseHandler.utils');
    return { ResponseHandler: mockResponseHandler };
});

const callUrl: string = `${env.apiPath}${baseExampleUrl}`;

describe(`example.controllers`, () => {
    let mongod: MongoMemoryServer;
    let originalMockJsonResMethod = ResponseHandler.prototype.jsonRes;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri, { useNewUrlParser: true });
    });

    afterAll(async () => {
        await mongod.stop();
        await mongoose.connection.close();
    });

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        ResponseHandler.prototype.jsonRes = originalMockJsonResMethod;
    });

    describe(`and POST createRecord`, () => {
        it('should return 200 & valid success response', () => {
            return request(app)
                .post(callUrl)
                .send(db.createRecord.payload)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.body).toMatchObject(db.createRecord.successfulResponse);
                    expect(response.status).toEqual(200);
                });
        });

        it('should return 500 & promise error response', () => {
            overideJsonResToFail();
            return request(app)
                .post(callUrl)
                .send(db.createRecord.payload)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: messageStrings.failedToCreate });
                });
        });

        it('should handle 500 incorrect payload', () => {
            return request(app)
                .post(callUrl)
                .send(db.createRecord.invalidPayload)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: db.createRecord.failureResponse });
                });
        });
    });

    describe(`and GET getById`, () => {
        it('should return 200 & valid success response', async () => {
            let id: string = await generateTestRecord();
            return request(app)
                .get(`${callUrl}/${id}`)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toMatchObject(db.getById.successfulResponse);
                });
        });

        it('should return 500 & promise error response', async () => {
            overideJsonResToFail();
            let id: string = await generateTestRecord();
            return request(app)
                .get(`${callUrl}/${id}`)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: messageStrings.failedToRetrieveDoc });
                });
        });

        it('should return 500 incorrect param', () => {
            return request(app)
                .get(`${callUrl}/${db.getById.failureResponse.value}`)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: db.getById.failureResponse });
                });
        });
    });

    describe('and PUT update record', () => {
        it('should return 200 & valid success response', async () => {
            let id: string = await generateTestRecord();
            return request(app)
                .put(`${callUrl}/${id}`)
                .send(db.updateRecord.payload)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toMatchObject({
                        ...db.updateRecord.successfulResponse,
                        _id: id,
                        details: { ...db.updateRecord.successfulResponse.details, _id: id },
                    });
                });
        });

        it('should return 500 & promise error response', async () => {
            overideJsonResToFail();
            let id: string = await generateTestRecord();
            return request(app)
                .put(`${callUrl}/${id}`)
                .send(db.updateRecord.payload)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: failedMessage });
                });
        });

        it('should return 500 incorrect payload', async () => {
            let id: string = await generateTestRecord();
            return request(app)
                .put(`${callUrl}/${id}`)
                .send(db.updateRecord.invalidPayload)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: failedMessage });
                });
        });
    });

    describe('and DELETE record', () => {
        it('should return 200 & valid success response', async () => {
            let id: string = await generateTestRecord();
            return request(app)
                .delete(`${callUrl}/${id}`)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toMatchObject({
                        ...db.deleteRecord.succesfulResponse,
                        _id: id,
                    });
                });
        });

        it('should return 500 & promise error response', async () => {
            overideJsonResToFail();
            let id: string = await generateTestRecord();
            return request(app)
                .delete(`${callUrl}/${id}`)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: messageStrings.failedToDeleteDocument });
                });
        });

        it('should return 500 incorrect payload', async () => {
            return request(app)
                .delete(`${callUrl}/${db.deleteRecord.failureResponse.value}`)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: db.deleteRecord.failureResponse });
                });
        });
    });
});

async function generateTestRecord(): Promise<string> {
    let id: string = '';
    const Record = await mongoose.connection.model('Example');
    const record = new Record({ title: 'cat' });
    await record.save().then((result: any) => {
        id = result?._id;
    });
    return id;
}

function overideJsonResToFail(): void {
    ResponseHandler.prototype.jsonRes = (result: any, res: any) => {
        throw Error('cat');
    };
}
