const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Pokemon API Documentation',
            version: '1.0.0',
            description: 'API Documentation for my Express.js application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID of the user',
                        },
                        username: {
                            type: 'string',
                            description: 'Username of the user',
                        },
                        password: {
                            type: 'string',
                            description: 'Password of the user',
                        },
                    }
                },
                Pokemon: {
                    type: "object",
                    required: ["name", "hp", "cp", "type"],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID of the pokemon',
                            required: true
                        },
                        name: {
                            type: 'string',
                            description: 'Name of The pokemon',
                        },
                        hp: {
                            type: 'string',
                        },
                        cp: {
                            type: 'string',
                        },
                        picture: {
                            type: 'string',
                            description: 'picture of The pokemon',
                        },
                        types: {
                            type: 'array',
                            description: 'types of pokemon',
                            items: {
                                type: 'string',
                                description: 'Type of the pokemon',
                            }
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Users',
                description: 'API for managing users',
            },
            {
                name: 'Pokemons',
                description: 'API for managing pokemons'
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
module.exports = swaggerDocs;
