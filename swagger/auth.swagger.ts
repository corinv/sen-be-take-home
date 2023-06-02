import generatedEndpoint from './utils';

class Auth {
    name: string = 'Authentication';

    static getTag() {
        return {
            name: this.name,
            description: 'Authentication Routes',
        };
    }

    static getSchema() {
        return {
            Token: {
                title: 'Token',
                type: 'object',
                properties: {
                    id: {
                        type: 'number'
                    },
                    token: {
                        type: 'string'
                    }
                }
            },
            loginBody: {
                title: 'Login',
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                    },
                    password: {
                        type: 'string'
                    }
                }
            }
        };
    }

    static getPaths() {
        return {
            '/auth/login': {
                get: generatedEndpoint({
                    tag: this.name,
                    summary: 'Returns the login token',
                    description: 'Takes a request of a user\'s login and generates a JWT token',
                    operationalId: 'getUser',
                    schemas: {
                        body: '#/components/schemas/loginBody',
                        bodyRequired: true,
                        response: {
                            reference: '#/components/schemas/Token',
                            description: 'Returned user object',
                            required: true,
                        },
                    },
                }),
            },
            
        };
    }
}

export default Auth;
