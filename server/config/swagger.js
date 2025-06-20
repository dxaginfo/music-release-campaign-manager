const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Music Release Campaign Manager API',
        version: '1.0.0',
        description: 'API documentation for Music Release Campaign Manager',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5000}`,
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{
        bearerAuth: [],
      }],
    },
    apis: ['./routes/*.js', './models/*.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
