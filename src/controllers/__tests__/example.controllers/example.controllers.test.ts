import { env } from '../../../environment/env';
import { app } from '../../../jestTestSetup';
import { baseExampleUrl } from '../../../routes';
import { MongoMemoryServer } from 'mongodb-memory-server';
const mongoose = require('mongoose');

// import { db } from './utils/db';
// import { ResponseHandler } from '../../responseHandler.utils';

// jest.mock('../../responseHandler.utils', function () {
//     const { ResponseHandler: mockResponseHandler } = jest.requireActual('../../responseHandler.utils');
//     return { ResponseHandler: mockResponseHandler };
// });

const request = require('supertest');

const getByIdEndpoint = `${env.apiPath}${baseExampleUrl}/:id`;

describe(`example.controllers`, () => {
    let mongod: MongoMemoryServer;
    beforeAll(async () => {
        // This will create an new instance of "MongoMemoryServer" and automatically start it
        mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();
        console.log('uri', uri);

        const Schema = mongoose.Schema;

        const userSchema = new Schema({
            name: String,
            email: {
                type: String,
                require: true,
                unique: true,
            },
        });

        const User = mongoose.model('User', userSchema);

        app.post('/signup', async (req, res) => {
            const { name, email } = req.body;
            const user = new User({ name, email });
            const ret = await user.save();
            res.json(ret);
        });

        await mongoose.connect(uri, { useNewUrlParser: true });
    });

    afterAll(async () => {
        // The Server can be stopped again with
        await mongod.stop();
        await mongoose.connection.close();
    });

    describe(`and get getById`, () => {
        // beforeEach(() => {
        //     jest.spyOn(console, 'log').mockImplementation(() => {});
        // });

        it('should return 200 & valid success response', async () => {
            return await request(app)
                .post('/signup')
                .send({
                    name: 'Zell',
                    email: 'testing@gmail.com',
                })
                .set('Accept', 'application/json')
                .then((response: any) => {
                    expect(response.status).toEqual(200);
                });
        });

        // it('should return 500 & promise error response', async () => {
        //     await nock(process.env.AUTH_ORG_URL)
        //         .post('/api/v1/users', db.users.createUser.request)
        //         .reply(200, db.users.createUser.successResponse);

        //     const mockResponseHandler = new ResponseHandler();
        //     ResponseHandler.prototype.jsonRes = (result: any, res: any) => {
        //         throw Error('cat');
        //     };

        //     return await request(app)
        //         .post(createUserEndpoint)
        //         .send(db.users.createUser.request)
        //         .set('Accept', 'application/json')
        //         .then((response: any) => {
        //             expect(response.status).toEqual(500);
        //             expect(response.body).toMatchObject({ error: mockResponseHandler.defaultErrResMessage });
        //         });
        // });

        // it('should handle okta 400 and return correct body', async () => {
        //     await nock(process.env.AUTH_ORG_URL)
        //         .post('/api/v1/users', db.users.createUser.request)
        //         .reply(400, db.users.createUser.userExistsResponse);
        //     return await request(app)
        //         .post(createUserEndpoint)
        //         .send(db.users.createUser.request)
        //         .set('Accept', 'application/json')
        //         .then((response: any) => {
        //             expect(response.status).toEqual(400);
        //             expect(response.body).toMatchObject({ error: db.users.createUser.userExistsResponse });
        //         });
        // });

        // it('should handle 400 invalid payload', async () => {
        //     return await request(app)
        //         .post(createUserEndpoint)
        //         .send(db.users.createUser.invalidRequest)
        //         .set('Accept', 'application/json')
        //         .then((response: any) => {
        //             expect(response.status).toEqual(400);
        //             expect(response.body).toMatchObject(db.users.createUser.invalidPayloadResponse);
        //         });
        // });
    });
});
