import express from 'express';
import pinoHttp from 'pino-http';
import routes from './routes';
import logger from './util/logger';

const app = express();
const port = 3000;

app.use(pinoHttp({ logger }));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
