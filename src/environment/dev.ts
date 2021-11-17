import { IEnv } from "../interfaces/IEnv";

export const ENV:IEnv = {
    stage: process.env.ENVIRONMENT,
    port:8082,
    domain:'',
    apiPath: '',
    staticPath: '',
    db:{
        name: 'myFirstDatabase',
        user:'dbUser',
        pw: '5aqQ!W74w5#3P6-',
        account: 'cluster0',
        uri: (user: string, pw :string, name :string, account: string) => {
            return `mongodb+srv://${user}:${pw}@${account}.gcp.mongodb.net/${name}?retryWrites=true&w=majority`
        }
    },
    
}


