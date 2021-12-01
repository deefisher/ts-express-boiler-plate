export const db = {
    users: {
        createUser: {
            request: {
                profile: {
                    firstName: 'Foo',
                    lastName: 'Bar',
                    email: 'blahblah6@gmail.com',
                    login: 'blahblah6@gmail.com',
                },
            },
            invalidRequest: {
                profile: {
                    cat: 'Foo',
                    lastName: 'Bar',
                    email: 'blahblah6@gmail.com',
                    login: 'blahblah6@gmail.com',
                },
            },
            successResponse: {
                id: '00u2vpdhrf5684dbBN5d7',
                status: 'PROVISIONED',
                created: '2021-11-25T18:59:39.000Z',
                activated: '2021-11-25T18:59:40.000Z',
                statusChanged: '2021-11-25T18:59:40.000Z',
                lastLogin: null,
                lastUpdated: '2021-11-25T18:59:40.000Z',
                passwordChanged: null,
                type: {
                    id: 'otycell1M487fhi7swyswi5d5',
                },
                profile: {
                    firstName: 'Foo',
                    lastName: 'Bar',
                    mobilePhone: null,
                    secondEmail: null,
                    login: 'blahblah6@gmail.com',
                    email: 'blahblah6@gmail.com',
                },
                credentials: {
                    emails: [
                        {
                            value: 'blahblah6@gmail.com',
                            status: 'VERIFIED',
                            type: 'PRIMARY',
                        },
                    ],
                    provider: {
                        type: 'OKTA',
                        name: 'OKTA',
                    },
                },
                _links: {
                    suspend: {
                        href: `${process.env.AUTH_ORG_URL}/api/v1/users/00u2vpdhrui684dbBN5d7/lifecycle/suspend`,
                        method: 'POST',
                    },
                    schema: {
                        href: `${process.env.AUTH_ORG_URL}/api/v1/meta/schemas/user/osccell1iiBhnGswi5d5`,
                    },
                    resetPassword: {
                        href: `${process.env.AUTH_ORG_URL}/api/v1/users/00u2vpdhru56i4dbBN5d7/lifecycle/reset_password`,
                        method: 'POST',
                    },
                    reactivate: {
                        href: `${process.env.AUTH_ORG_URL}/api/v1/users/00u2vpdhru568idbBN5d7/lifecycle/reactivate`,
                        method: 'POST',
                    },
                    self: {
                        href: `${process.env.AUTH_ORG_URL}/api/v1/users/00u2vpdhri5684dbBN5d7`,
                    },
                    type: {
                        href: `${process.env.AUTH_ORG_URL}/api/v1/meta/types/user/otycell1Mi87fhy7swyswi5d5`,
                    },
                    deactivate: {
                        href: `${process.env.AUTH_ORG_URL}/api/v1/users/00u2vpdhri5684dbBN5d7/lifecycle/deactivate`,
                        method: 'POST',
                    },
                },
            },
            userExistsResponse: {
                name: 'OktaApiError',
                status: 400,
                errorCode: 'E0000001',
                errorSummary: 'Api validation failed: login',
                errorCauses: [
                    {
                        errorSummary: 'login: An object with this field already exists in the current organization',
                    },
                ],
                errorLink: 'E0000001',
                errorId: 'oaeSb4o8L5KQnaI82JUIMEGQQ',
                url: `${process.env.AUTH_ORG_URL}/api/v1/users`,
                headers: {},
                message:
                    'Okta HTTP 400 E0000001 Api validation failed: login. login: An object with this field already exists in the current organization',
            },
            invalidPayloadResponse: {
                error: {
                    issues: [
                        {
                            code: 'invalid_type',
                            expected: 'string',
                            received: 'undefined',
                            path: ['profile', 'firstName'],
                            message: 'Required',
                        },
                    ],
                    name: 'ZodError',
                },
            },
        },
    },
};
