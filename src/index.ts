require('dotenv').config();
// require('debugging-aid/network');
import { env } from './environment/env';
import { App } from './application';
import { middleware } from './middleware';
import { routerTemplate, usersRouter } from './routes';

const port: number = env.port ?? 8080;
let dbConString;

try {
    dbConString = env.db.uri(env.db.user, env.db.pw, env.db.name, env.db.account);
} catch (e) {
    console.log('Failed to create DB Connection string:', e);
}

/**
 * Configure App instance
 */
const app = new App(
    port,
    middleware,
    [routerTemplate, usersRouter], //* Add your express router objects here
);

/**
 * Connect to MongoDB
 */
dbConString ? app.mongoDB(dbConString) : console.log('Not Starting MongoDB Connection');

/**
 * Launch!
 */
app.listen();
