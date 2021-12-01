import { Response } from 'express';
const okta = require('@okta/okta-sdk-nodejs');

export class ResponseHandler {
    defaultErrResMessage: string = 'Server Error';
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
     * @param message custom response message or payload to be provided to the client in a JSON body response ({error:'message'})
     * @param res response object to be used to to send
     * @param status custom status code, defaults to 500
     */
    errRes(err: any, res: Response, message: any = this.defaultErrResMessage, status = 500) {
        console.log('err', err);
        res.status(err?.status || status).json({ error: Object.keys(err).length ? err : message });
    }
}
