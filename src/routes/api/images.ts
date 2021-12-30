import { Router, Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import status from 'statuses';

const images = Router();
images.get('/', async (req: Request, res: Response) => {
    const filename = String(req.query.filename) || null
    const width = Number(req.query.width) || null;
    const height = Number(req.query.height) || null;
    
    if (!filename || !width || !height) {
      return res.status(status('Bad Request') as number).json({
        message: 'Bad request, one or more of the following parameters (filename, width, height) is/are missing'
      });
    }

    if (!await exists(path.resolve(`./src/images/full/${filename}.jpg`))) {
      return res.status(status('Not Found') as number).json({
        message: `${filename}.jpg not found`
      });
    }

    if (await exists(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.jpg`))) {
      return res.sendFile(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.jpg`));
    }

    try {
      await resizeImage(filename, width, height);
      return res.sendFile(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.jpg`));
    } catch (error) {
      return res.status(status('Internal Server Error') as number).json({
        message: error.message
      });
    }
});

async function resizeImage(filename: string, width: number, height: number) {
    try {
      await sharp(path.resolve(`./src/images/full/${filename}.jpg`))
        .resize({
          width,
          height
        })
        .toFile(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.jpg`));
    } catch (error) {
      throw new Error(error);
    }
  }

async function exists (path: string) {  
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
  }
export default images;
