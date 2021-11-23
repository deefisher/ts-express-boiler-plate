import { NextFunction, Request, Response } from 'express';
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `${process.env.AUTH_ORG_URL}/oauth2/default`,
});

export class AuthMiddleware {
    /**
     * Checks the jwt value provided in the authorization header is valid
     */
    validateAuth = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req?.headers?.authorization || '';
        const match = authHeader?.match(/Bearer (.+)/);

        if (!match) {
            res.status(401);
            return next('Unauthorized');
        }

        const accessToken = match?.[1];

        return oktaJwtVerifier
            .verifyAccessToken(accessToken, 'api://default')
            .then(() => {
                next();
            })
            .catch((err: Error) => {
                res.status(401).send(err.message);
            });
    };
}
