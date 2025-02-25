const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Pokémon API',
            version: '1.0.0',
            description: 'API de gestion de Pokémon et d\'équipes',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Pokemon: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        hp: { type: 'number' },
                        cp: { type: 'number' },
                        picture: { type: 'string' },
                        types: {
                            type: 'array',
                            items: { type: 'string' }
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        username: { type: 'string' },
                        password: { type: 'string' }
                    }
                },
                Team: {  // New schema for Team
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        pokemons: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Pokemon' }
                        }
                    }
                }
            }
        },
    },
    apis: ['./src/routes/*.js']  // Automatically parse the files in routes for Swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;