import { User } from '@okta/okta-sdk-nodejs';
import { NewUserProfile } from './user.schema';

interface INewUserProfile extends NewUserProfile {}

export interface IAuthClient {
    createUser: (body: INewUserProfile) => Promise<User>;
}
