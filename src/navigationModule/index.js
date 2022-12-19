import fs from 'fs/promises'

export const checkNavigation = async (newPath, cb) => {
    try {
        await fs.readdir(newPath, { withFileTypes: false });
        cb();
    } catch (e) {
        console.log('Operation failed: folder does not exists');
    }
};
