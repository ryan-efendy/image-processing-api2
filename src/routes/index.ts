import { Router, Request, Response } from 'express';
import images from './api/images';
const routes = Router();

routes.get('/', (_req: Request, res: Response) => res.send('home route'));

routes.use('/images', images);

routes.get('/health', (_req: Request, res: Response) => res.send({ message: 'OK' }));

export default routes;
