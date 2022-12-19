import fs from 'fs';
import path from 'path';
import remove from "./remove.js";

const copy = (pathToFile, pathToNewDirectory, deleteSource, cb) => {
    fs.stat(pathToFile, err => {
        if (err) {
            console.log('Operation failed');
        }
        else {
            const destinationFile = path.join(pathToNewDirectory, path.basename(pathToFile));
            fs.stat(destinationFile, err => {
                if (err) {
                    const readable = fs.createReadStream(pathToFile);
                    const writable = fs.createWriteStream(destinationFile);

                    readable.pipe(writable);

                    writable.on('finish', () => {
                        if (deleteSource) remove(pathToFile);
                        cb();
                    });
                } else {
                    console.log('Operation failed');
                }
            })
        }
    });
};

export default copy;
