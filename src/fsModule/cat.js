import fs from 'fs';

const cat = (pathToFile, cb) => {
    fs.readFile(pathToFile, 'utf-8',(err, data) => {
        if (err) {
            console.log('Operation failed');
        } else {
            console.log(data);
            cb();
        }
    })
};

export default cat;
