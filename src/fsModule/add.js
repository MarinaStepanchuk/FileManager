import fs from 'fs';
import path from 'path';

const add = (fileName, currentDirectory, cb) => {
    fs.access(path.join(currentDirectory, fileName), fs.F_OK, err => {
        if (err) {
            fs.writeFile(path.join(currentDirectory, fileName), '', err => {
                if(err) throw err;
                cb();
            })
            return;
        }
        console.log('Operation failed');
    })
};

export default add;
