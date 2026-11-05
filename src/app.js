import express from 'express';
import servicesRouter from './routes/services.router.js';

const app = express();

// Middlewares para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/services', servicesRouter);

export default app;
