import fs from 'fs';
import path from 'path';

const rename = (pathToFile, newFilename, cb) => {
    fs.access(pathToFile, fs.F_OK, err => {
        if (err) {
            console.log('Operation failed');
        } else {
            const destinationPath = path.join(path.dirname(pathToFile), `${newFilename}${path.parse(pathToFile)?.ext}`);
            fs.access(destinationPath, fs.F_OK, err => {
                if (err) {
                    fs.rename(pathToFile, destinationPath, err => {
                        if (err) console.log(err);
                        cb();
                    });
                } else {
                    console.log('Operation failed');
                }
            })
        }
    })
};

export default rename;
