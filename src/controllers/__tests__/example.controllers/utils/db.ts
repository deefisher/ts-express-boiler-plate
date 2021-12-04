const mockTitle: string = 'Zell';
const mockCreationDate: number = new Date().getTime();
export const db = {
    createRecord: {
        payload: {
            title: mockTitle,
            date_created: mockCreationDate,
        },
        invalidPayload: {
            title: mockTitle,
            date_created: mockCreationDate,
            _id: 1234,
        },
        successfulResponse: {
            title: mockTitle,
            date_created: mockCreationDate,
            order: 0,
            hide: false,
            _id: expect.any(String),
            __v: 0,
        },
        failureResponse: {
            errors: {
                _id: {
                    stringValue: '"1234"',
                    valueType: 'number',
                    kind: 'ObjectId',
                    value: 1234,
                    path: '_id',
                    reason: {},
                    name: 'CastError',
                    message: 'Cast to ObjectId failed for value "1234" (type number) at path "_id"',
                },
            },
            _message: 'Example validation failed',
            name: 'ValidationError',
            message:
                'Example validation failed: _id: Cast to ObjectId failed for value "1234" (type number) at path "_id"',
        },
    },
    getById: {
        successfulResponse: {
            __v: 0,
            _id: expect.any(String),
            hide: false,
            order: 0,
            title: 'cat',
        },
        failureResponse: {
            kind: 'ObjectId',
            message: 'Cast to ObjectId failed for value "sdfadsf" (type string) at path "_id" for model "Example"',
            name: 'CastError',
            path: '_id',
            reason: {},
            stringValue: '"sdfadsf"',
            value: 'sdfadsf',
            valueType: 'string',
        },
    },
    updateRecord: {
        payload: {
            details: {
                name: 'horse face',
            },
        },
        invalidPayload: {
            snails: {
                name: 'horse face',
            },
        },
        successfulResponse: {
            _id: undefined,
            order: 0,
            hide: false,
            __v: 0,
            details: {
                _id: undefined,
                name: 'horse face',
            },
        },
    },
    deleteRecord: {
        succesfulResponse: {
            _id: undefined,
            order: 0,
            hide: false,
            __v: 0,
        },
        failureResponse: {
            stringValue: '"khu"',
            valueType: 'string',
            kind: 'ObjectId',
            value: 'khu',
            path: '_id',
            reason: {},
            name: 'CastError',
            message: 'Cast to ObjectId failed for value "khu" (type string) at path "_id" for model "Example"',
        },
    },
};
