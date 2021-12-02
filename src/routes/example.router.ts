//express imports
import express = require('express');
export const routerTemplate = express.Router();

//controllers
import { exampleController } from '../controllers/controllers.module';

// Set the common part of the path for the routes in this router
export const baseExampleUrl = '/example-path';

//Routes
routerTemplate.post(`${baseExampleUrl}`, (req, res) => {
    exampleController.createFunction(req, res);
});
routerTemplate.put(`${baseExampleUrl}/:id`, (req, res) => {
    exampleController.putFunction(req, res);
});
routerTemplate.delete(`${baseExampleUrl}/:id`, (req, res) => {
    exampleController.deleteById(res, req.params.id);
});
routerTemplate.get(`${baseExampleUrl}/:id`, (req, res) => {
    exampleController.findById(res, req.params.id);
});
