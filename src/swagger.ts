const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Multilingual API Documentation',
    version: '1.0.0',
    description: 'API for Multilingual App',
  },
  servers: [
    {
      url: 'http://localhost:8000/api/v1',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/swagger-routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
