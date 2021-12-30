import express from 'express';
import pinoHttp from 'pino-http';
import routes from './routes';
import logger from './util/logger';

const app = express();

app.use(pinoHttp({ logger }));
app.use('/api', routes);

export default app;
