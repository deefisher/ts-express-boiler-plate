import { env } from './environment/env';
const okta = require('@okta/okta-sdk-nodejs');

export class AuthClient {
    private static instance: typeof okta.Client;

    static getInstance(): typeof okta.Client {
        if (!AuthClient.instance) {
            AuthClient.instance = new okta.Client({
                orgUrl: env.auth.orgUrl,
                token: env.auth.orgUrl,
            });
        }

        return AuthClient.instance;
    }
}
