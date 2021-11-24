import { Example } from './controllers/example';

describe('auth', () => {
    it('should resolve with true and valid userId for hardcoded token', async () => {
        const example = new Example('cat');
        expect(example.parameterValue).toEqual('cat');
    });
});
