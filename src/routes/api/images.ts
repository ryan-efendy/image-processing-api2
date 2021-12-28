
import { Router, Request, Response } from 'express';
const images = Router();
images.get('/', (_req: Request, res: Response) => {
  res.send('images route');
});
export default images;
