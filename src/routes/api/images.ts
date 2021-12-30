import { Router, Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import status from 'statuses';

const images = Router();
images.get('/', async (req: Request, res: Response) => {
    const filename = req.query.filename ? String(req.query.filename) : null;
    const width = Number(req.query.width) ?? null;
    const height = Number(req.query.height) ?? null;
    const format = String(req.query.format ?? 'jpg');
    const blur = Boolean(req.query.blur) ?? false;
    const grayscale = Boolean(req.query.grayscale) ?? false;

    if (!filename || !width || !height) {
        return res.status(status('Bad Request') as number).json({
            message: 'Bad request, one or more of the following parameters (filename, width, height) is/are missing'
        });
    }

    if (!(await exists(path.resolve(`./src/images/full/${filename}.${format}`)))) {
        return res.status(status('Not Found') as number).json({
            message: `${filename}.${format} not found`
        });
    }

    if (await exists(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.${format}`))) {
        return res.sendFile(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.${format}`));
    }

    try {
        await transformImage(filename, width, height, format, blur, grayscale);
        return res.sendFile(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.${format}`));
    } catch (error) {
        return res.status(status('Internal Server Error') as number).json({
            message: error.message
        });
    }
});

async function transformImage(
    filename: string,
    width: number,
    height: number,
    format: string,
    blur: boolean,
    grayscale: boolean
) {
    try {
        let imgTransformed = await sharp(path.resolve(`./src/images/full/${filename}.${format}`)).resize({
            width,
            height
        });

        if (blur) {
            imgTransformed = imgTransformed.blur(20);
        }

        if (grayscale) {
            imgTransformed = imgTransformed.grayscale();
        }
        return await imgTransformed.toFile(path.resolve(`./src/images/thumb/${filename}_${width}x${height}.${format}`));
    } catch (error) {
        throw new Error(error);
    }
}

async function exists(path: string) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}
export default images;
