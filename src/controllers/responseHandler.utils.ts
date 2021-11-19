import { Response } from 'express';
const okta = require('@okta/okta-sdk-nodejs');

export class ResponseHandler {
    /**
     * Sends the document as JSON in the body of response, and sets status to 200
     * @param result the result eg. MongoDB document to be returned to the client as JSON
     * @param res the response object that will be used to send http response
     */
    jsonRes(result: any, res: Response) {
        res.status(200).json(result);
    }
    /**
     * @param err error object of any type genereated by the system
     * @param message custom response message to be provided to the client in a JSON body response ({error:'message'})
     * @param res response object to be used to to send
     * @param status custom status code, defaults to 500
     */
    errRes(err: any, res: Response, message = 'Server Error', status = 500) {
        console.log('err', err.headers);
        res.status(status).json({ error: message });
    }
}