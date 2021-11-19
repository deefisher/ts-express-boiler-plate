import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { env } from '../environment/env';
import express from 'express';
import { AuthMiddleware } from './auth.middleware';

const cors = require('cors');
const authMiddleware = new AuthMiddleware();

export const middleware = [
    // authMiddleware.validateAuth, //postman: auth type: Bearer Token jwt
    express.json(),
    express.urlencoded({ extended: true }),
    multer({ dest: process.cwd() + '/tmp' }).single('media'),
    cors(),
    function (req: Request, res: Response, next: NextFunction) {
        res.set('Cache-Control', 'no-store, max-age=0');
        next();
    },
    function (req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    },
];
