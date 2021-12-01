import { stat } from 'fs/promises';

export const fileExists = async (path: string) => {
    try {
        const stats = await stat(path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
};

export const dirExists = async (path: string) => {
    try {
        const stats = await stat(path);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
};
