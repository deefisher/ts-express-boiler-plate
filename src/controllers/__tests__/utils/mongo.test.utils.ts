import { TestArgs } from '../../../types/test.interface';

const request = require('supertest');

export function generateMongoSuccessTest({
    appInstance,
    reqType,
    endpoint,
    testPayload,
    testResponse,
}: TestArgs): jest.ProvidesCallback | undefined {
    return async () => {
        return await request(appInstance)
            [reqType](endpoint)
            .send(testPayload)
            .set('Accept', 'application/json')
            .then((response: any) => {
                expect(response.body).toMatchObject(testResponse);
                expect(response.status).toEqual(200);
            });
    };
}

export function generateMongo500Test({
    appInstance,
    reqType,
    endpoint,
    testPayload,
    testResponse,
    mockResponseHandler,
}: TestArgs): jest.ProvidesCallback | undefined {
    return async () => {
        if (mockResponseHandler) {
            mockResponseHandler.prototype.jsonRes = (result: any, res: any) => {
                throw Error('cat');
            };
        }
        return await request(appInstance)
            [reqType](endpoint)
            .send(testPayload)
            .set('Accept', 'application/json')
            .then((response: any) => {
                expect(response.status).toEqual(500);
                expect(response.body).toMatchObject(testResponse);
            });
    };
}
