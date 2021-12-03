import { TestArgs, RecordPackage } from '../../../types/test.interface';
import { ResponseHandler } from '../../responseHandler.utils';

const request = require('supertest');

export function generateMongoSuccessTest({
    appInstance,
    reqType,
    endpoint,
    testPayload,
    testResponse,
    recordPackage,
}: TestArgs): jest.ProvidesCallback | undefined {
    return async () => {
        let id: string = await generateMockRecord(recordPackage);
        return await request(appInstance)
            [reqType](`${endpoint}${handleRecordId(id)}`)
            .send(testPayload)
            .set('Accept', 'application/json')
            .then((response: any) => {
                expect(response.body).toMatchObject(testResponse);
                expect(response.status).toEqual(200);
            });
    };
}

export function generateMongo500Test({
    appInstance,
    reqType,
    endpoint,
    testPayload,
    testResponse,
    mockResponseHandler,
    recordPackage,
    param,
}: TestArgs): jest.ProvidesCallback | undefined {
    return async () => {
        let id: string = await generateMockRecord(recordPackage);
        let mockJsonRes: any = generateMockFailureJsonRes(mockResponseHandler);
        return await request(appInstance)
            [reqType](`${endpoint}${param ? `/${param}` : handleRecordId(id)}`)
            .send(testPayload)
            .set('Accept', 'application/json')
            .then((response: any) => {
                expect(response.status).toEqual(500);
                expect(response.body).toMatchObject(testResponse);
                if (mockResponseHandler) {
                    mockResponseHandler.prototype.jsonRes = mockJsonRes;
                }
            });
    };
}

function generateMockFailureJsonRes(mockResponseHandler: typeof ResponseHandler | undefined) {
    let mockJsonRes: any;
    if (mockResponseHandler) {
        mockJsonRes = mockResponseHandler.prototype.jsonRes;
        mockResponseHandler.prototype.jsonRes = (result: any, res: any) => {
            throw Error('cat');
        };
    }
    return mockJsonRes;
}

function handleRecordId(id: string) {
    return id ? `/${id}` : '';
}

async function generateMockRecord(recordPackage: RecordPackage | undefined): Promise<string> {
    let id: string = '';
    if (recordPackage) {
        const { recordPayload, modelName, mongooseInstance } = recordPackage;
        const Record = await mongooseInstance.connection.model(modelName);
        const record = new Record(recordPayload);
        await record.save().then((result: any) => {
            id = result?._id;
        });
    }
    return id;
}
