import { Response } from 'express';
import { IModel } from '../types/IModel';
import { IPopulate } from '../types/IPopulate';
import { ResponseHandler } from './responseHandler.utils';
import mongoose = require('mongoose');

export const messageStrings = {
    failedToCreate: 'Failed to create',
    failedToFindDocuments: 'Failed to find documents',
    failedToFindDocument: 'Failed to find document',
    failedToRetrieveDoc: 'Failed to retrieve doc',
    failedToUpdateDocument: 'Failed to update document',
    failedToDeleteDocument: 'Failed to delete document',
};
/**
 * Provides functions to be used with express routes. Serves common CRUD fuctionality.
 */
export class BaseController {
    responseHandler: ResponseHandler = new ResponseHandler();
    public useModReturnNew = { useFindAndModify: false, new: true };
    constructor(public model: IModel) {
        this.model = model;
    }

    get jsonRes() {
        return this.responseHandler.jsonRes;
    }

    get errRes() {
        return this.responseHandler.errRes;
    }

    /**
     * Creates a new document
     */
    create(res: Response, document: any, populate?: IPopulate, errMsg = messageStrings.failedToCreate) {
        this.model
            .create<mongoose.Document>(document)
            .then((doc: mongoose.Document) => {
                if (populate) {
                    doc.populate(populate)
                        .then((populatedDoc) => {
                            this.jsonRes(populatedDoc, res);
                        })
                        .catch((err) => {
                            this.errRes(err, res, errMsg);
                        });
                } else {
                    this.jsonRes(doc, res);
                }
            })
            .catch((err) => {
                this.errRes(err, res, errMsg);
            });
    }
    /**
     * Returns all documents of model
     */
    find(res: Response, populate?: IPopulate, errMsg = messageStrings.failedToFindDocuments) {
        this.model
            .find(populate)
            .then(
                (doc) => {
                    this.jsonRes(doc, res);
                },
                (err) => {
                    this.errRes(err, res, errMsg);
                },
            )
            .catch((err) => {
                this.errRes(err, res, messageStrings.failedToFindDocuments);
            });
    }
    /**
     * Returns single doucument of model specified by _id.
     */
    findById(
        res: Response,
        documentId: string,
        populate?: IPopulate,
        errMsg = `${messageStrings.failedToFindDocument}${documentId}`,
    ) {
        this.model
            .findById(documentId, populate)
            .then(
                (doc) => {
                    this.jsonRes(doc, res);
                },
                (err) => {
                    this.errRes(err, res, errMsg);
                },
            )
            .catch((err) => {
                this.errRes(err, res, messageStrings.failedToRetrieveDoc);
            });
    }
    /**
     * Returns single document from given model that matches the query.
     */
    findOne(
        res: Response,
        query: any,
        populate?: IPopulate,
        errMsg = `${messageStrings.failedToFindDocument}${query}`,
    ) {
        this.model
            .findOne(query, populate)
            .then(
                (doc) => {
                    this.jsonRes(doc, res);
                },
                (err) => {
                    this.errRes(err, res, errMsg);
                },
            )
            .catch((err) => {
                this.errRes(err, res, messageStrings.failedToFindDocument);
            });
    }
    findMany(
        res: Response,
        query: any,
        populate?: IPopulate,
        errMsg = `${messageStrings.failedToFindDocument}${query}`,
    ) {
        this.model
            .findMany(query, populate)
            .then(
                (doc) => {
                    this.jsonRes(doc, res);
                },
                (err) => {
                    this.errRes(err, res, errMsg);
                },
            )
            .catch((err) => {
                this.errRes(err, res, messageStrings.failedToFindDocument);
            });
    }

    /**
     * Updates single document,
     */
    updateById(
        res: Response,
        documentId: string,
        document: any,
        populate?: IPopulate | IPopulate[],
        errMsg = `${messageStrings.failedToUpdateDocument} ${documentId}`,
    ) {
        this.model
            .updateById(documentId, document, populate)
            .then(
                (doc) => {
                    this.jsonRes(doc, res);
                },
                (err) => {
                    this.errRes(err, res, errMsg);
                },
            )
            .catch((err) => {
                this.errRes(err, res, messageStrings.failedToUpdateDocument);
            });
    }
    /**
     * Deletes a single document selected by id
     */
    deleteById(res: Response, documentId: string, errMsg = `${messageStrings.failedToDeleteDocument} ${documentId}`) {
        this.model
            .deleteById(documentId)
            .then(
                (doc) => {
                    this.jsonRes(doc, res);
                },
                (err) => {
                    this.errRes(err, res, errMsg);
                },
            )
            .catch((err) => {
                this.errRes(err, res, messageStrings.failedToDeleteDocument);
            });
    }
}
