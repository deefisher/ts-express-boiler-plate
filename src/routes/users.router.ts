import express = require('express');
export const usersRouter = express.Router();

//controllers
import { usersController } from '../controllers/controllers.module';

// Set the common part of the path for the routes in this router
export const baseUserUrl = '/users';
export const create = '/create';

//Routes
usersRouter.post(`${baseUserUrl}${create}`, (req, res) => {
    usersController.createUser(req, res);
});
