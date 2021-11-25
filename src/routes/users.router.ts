import express = require('express');
export const usersRouter = express.Router();

//controllers
import { usersController } from '../controllers/controllers.module';

// Set the common part of the path for the routes in this router
export const base = '/users';
export const create = '/create';

//Routes
usersRouter.post(`${base}${create}`, (req, res) => {
    usersController.createUser(req, res);
});
