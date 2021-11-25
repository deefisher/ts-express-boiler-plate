import { App } from '../../application';
import { env } from '../../environment/env';
import { middleware } from '../../middleware';
import { base, create, routerTemplate, usersRouter } from '../../routes';
const request = require('supertest');

const { app } = new App(
    8082,
    middleware,
    [routerTemplate, usersRouter], //* Add your express router objects here
);

//TODO clean up all other hard coded strings
//TODO install nok

const createUserEndpoint = `${env.apiPath}${base}${create}`;
describe(`POST createUserEndpoint`, () => {
    it('should return 200 & valid response', async () => {
        return await request(app)
            .post(createUserEndpoint)
            .send({
                profile: {
                    firstName: 'Foo',
                    lastName: 'Bar',
                    email: 'aliesterfisher5@gmail.com',
                    login: 'aliesterfisher5@gmail.com',
                },
            })
            .set('Accept', 'application/json')
            .then((response: any) => {
                expect(response.status).toEqual(200);
            });
    });
});
