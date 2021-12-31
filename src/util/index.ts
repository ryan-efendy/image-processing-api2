import { ensureDir } from 'fs-extra';
export const createDirIfNotExist = async (dirPath: string) => {
    try {
        await ensureDir(dirPath);
    } catch (error) {
        throw new Error(error);
    }
};
