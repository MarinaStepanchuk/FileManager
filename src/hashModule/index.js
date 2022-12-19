import fs from 'fs';
import { createHash } from 'node:crypto'

const calculateHash = (pathToFile, cb) => {
    fs.readFile(pathToFile, (err, data) => {
        if (err) {
            console.log('Operation failed: file does not exist or maybe you need to specify file extension');
            cb();
        } else {
            console.log(createHash('sha3-256').update(data).digest('hex'));
            cb();
        }
    });
};

export default calculateHash;
