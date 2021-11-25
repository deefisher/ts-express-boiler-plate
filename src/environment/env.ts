import { dotEnvValue, IEnv } from '../types/IEnv';

export const env: IEnv = {
    port: Number(process.env.PORT),
    domain: process.env.DOMAIN,
    apiPath: '/api',
    staticPath: '',
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        pw: process.env.DB_PASSWORD,
        account: process.env.DB_ACCOUNT,
        uri: (user: dotEnvValue, pw: dotEnvValue, name: dotEnvValue, account: dotEnvValue) => {
            return `mongodb://${user}:${encodeURIComponent(
                pw as string,
            )}@${account}-shard-00-00.aim80.mongodb.net:27017,${account}-shard-00-01.aim80.mongodb.net:27017,${account}-shard-00-02.aim80.mongodb.net:27017/${name}?ssl=true&replicaSet=atlas-u2yfd2-shard-0&authSource=admin&retryWrites=true&w=majority`;
        },
    },
    auth: {
        orgUrl: process.env.AUTH_ORG_URL,
        token: process.env.AUTH_API_TOKEN, // Obtained from Developer Dashboard
    },
};
