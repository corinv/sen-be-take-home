import generatedEndpoint from './utils';

class Users {
    name: string = 'Users';

    static getTag() {
        return {
            name: this.name,
            description: 'Users endpoints',
        };
    }

    static getSchema() {
        return {
            User: {
                title: 'User',
                type: 'object',
                properties: {
                    id: {
                        type: 'number'
                    },
                    email: {
                        type: 'string',
                    },
                    password: {
                        type: 'string'
                    },
                    password_attempt: {
                        type: 'number'
                    },
                    is_blocked: {
                        type: 'boolean'
                    },
                    created_at: {
                        type: 'string',
                        format: 'date-time'
                    },
                    updated_at: {
                        type: 'string',
                        format: 'date-time'
                    },
                },
            },
            UserArray: {
                title: 'UserArray',
                type: 'array',
                items: {
                    $ref: '#/components/schemas/User'
                }
            }
        };
    }

    static getPaths() {
        return {
            '/users/current': {
                get: generatedEndpoint({
                    tag: this.name,
                    summary: 'Gets the current user',
                    description: 'Returns information about the currently logged in user',
                    operationalId: 'getCurrentUser',
                    schemas: {
                        bodyRequired: false,
                        response: {
                            reference: '#/components/schemas/User',
                            description: 'Returned user object',
                            required: true,
                        },
                    },
                }),
                put: generatedEndpoint({
                    tag: this.name,
                    summary: 'Updates the current user',
                    description: 'Takes properties to update in the request body and updates the currently logged in user',
                    operationalId: 'updateCurrentUser',
                    schemas: {
                        body: '#/components/schemas/User',
                        bodyRequired: true,
                        response: {
                            reference: '#/components/schemas/User',
                            description: 'Returned user object',
                            required: true,
                        },
                    },
                }),
            },
        }
    }
}

export default Users;
