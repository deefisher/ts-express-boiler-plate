import { App } from './application';
import { middleware } from './middleware';
import { routerTemplate, usersRouter } from './routes';

export const { app } = new App(
    8082,
    middleware,
    [routerTemplate, usersRouter], //* Add your express router objects here
);
