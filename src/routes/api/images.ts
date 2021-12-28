import { Router, Request, Response } from 'express';
import path from 'path';

const images = Router();
images.get('/', (req: Request, res: Response) => {
    //   console.log(req.query);
    const {filename } = req.query;
    res.sendFile(path.resolve(`./src/images/full/${filename}.jpg`));
    // res.send('images route');
});
export default images;
