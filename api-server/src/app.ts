import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:8100', 
    'https://editor.swagger.io',
    'https://bj-hotel-api.onrender.com' ,
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

// Dynamic Swagger configuration
const isProduction = process.env.NODE_ENV === 'production';
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation for  project',
    },
    servers: [
      {
        url: isProduction 
          ? 'https://bj-hotel-api.onrender.com/api/v1' 
          : 'http://localhost:3000/api/v1',
        description: isProduction ? 'Production server' : 'Local development'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/api/v1/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || 'development'
  };
  res.status(200).json(healthcheck);
});

export default app;