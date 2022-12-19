import zlib from 'zlib';
import fs from 'fs';
import path from 'path';

const compress = async (pathToFile, pathToDestination, cb) => {
    const brotliCompress = zlib.createBrotliCompress();

    try {
        await fs.promises.readFile(pathToFile);
        await fs.promises.readdir(pathToDestination);

        const input = fs.createReadStream(pathToFile);
        const out = fs.createWriteStream(path.join(pathToDestination, `${path.basename(pathToFile)}.br`));

        input.pipe(brotliCompress).pipe(out);

        out.on('finish', () => {
            cb();
        });
    } catch(e) {
        console.log('Operation failed');
    }
};

const decompress = async (pathToFile, pathToDestination, cb) => {
    const brotliDecompress = zlib.createBrotliDecompress();

    try {
        await fs.promises.readFile(pathToFile);
        await fs.promises.readdir(pathToDestination);

        const input = fs.createReadStream(pathToFile);
        const out = fs.createWriteStream(path.join(pathToDestination, `${path.basename(pathToFile, '.br')}`));

        input.pipe(brotliDecompress).pipe(out);

        out.on('finish', () => {
            cb();
        });
    } catch(e) {
        console.log('Operation failed');
    }
}

export {
    compress,
    decompress
}
