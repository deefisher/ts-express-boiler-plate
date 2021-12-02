import { env } from '../../../environment/env';
import { baseUserUrl, create } from '../../../routes';
import { db } from './utils/db';
import { ResponseHandler } from '../../responseHandler.utils';
import { app } from '../../../jestTestSetup';

jest.mock('../../responseHandler.utils', function () {
    const { ResponseHandler: mockResponseHandler } = jest.requireActual('../../responseHandler.utils');
    return { ResponseHandler: mockResponseHandler };
});

const nock = require('nock');
const request = require('supertest');

const createUserExpressServerEndpoint = `${env.apiPath}${baseUserUrl}${create}`;
const oktaEndpoint = '/api/v1/users';

describe(`users.controllers`, () => {
    describe(`and POST createUserEndpoint`, () => {
        beforeEach(() => {
            jest.spyOn(console, 'log').mockImplementation(() => {});
        });

        it('should return 200 & valid success response', async () => {
            await nock(process.env.AUTH_ORG_URL)
                .post(oktaEndpoint, db.users.createUser.request)
                .reply(200, db.users.createUser.successResponse);
            return await request(app)
                .post(createUserExpressServerEndpoint)
                .send(db.users.createUser.request)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(200);
                    expect(response.body).toMatchObject(db.users.createUser.successResponse);
                });
        });

        it('should return 500 & promise error response', async () => {
            await nock(process.env.AUTH_ORG_URL)
                .post(oktaEndpoint, db.users.createUser.request)
                .reply(200, db.users.createUser.successResponse);

            const mockResponseHandler = new ResponseHandler();
            ResponseHandler.prototype.jsonRes = (result: any, res: any) => {
                throw Error('cat');
            };

            return await request(app)
                .post(createUserExpressServerEndpoint)
                .send(db.users.createUser.request)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(500);
                    expect(response.body).toMatchObject({ error: mockResponseHandler.defaultErrResMessage });
                });
        });

        it('should handle 400 and return correct body', async () => {
            await nock(process.env.AUTH_ORG_URL)
                .post(oktaEndpoint, db.users.createUser.request)
                .reply(400, db.users.createUser.userExistsResponse);
            return await request(app)
                .post(createUserExpressServerEndpoint)
                .send(db.users.createUser.request)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toMatchObject({ error: db.users.createUser.userExistsResponse });
                });
        });

        it('should handle 400 invalid payload', async () => {
            return await request(app)
                .post(createUserExpressServerEndpoint)
                .send(db.users.createUser.invalidRequest)
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(400);
                    expect(response.body).toMatchObject(db.users.createUser.invalidPayloadResponse);
                });
        });
    });
});
