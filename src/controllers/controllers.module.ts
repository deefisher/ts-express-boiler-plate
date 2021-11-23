/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */
import { User } from '@okta/okta-sdk-nodejs';
import { AuthClient } from '../authClient';
import { newUserProfileSchema } from '../types/user.schema';
import { ExampleController } from './example.controller';
import { UsersController } from './users.controller';
export const exampleController = new ExampleController();
export const usersController = new UsersController(AuthClient.getInstance(), newUserProfileSchema);
