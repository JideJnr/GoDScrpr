"use strict";
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hotel Management API',
            version: '1.0.0',
            description: 'API for managing hotel bookings',
        },
        servers: [
            { url: 'http://localhost:3000/api/v1' }, // local dev server URL (adjust as needed)
        ],
    },
    apis: ['./src/routes/api/v1/*.js'],
};
const specs = swaggerJsdoc(options);
module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
