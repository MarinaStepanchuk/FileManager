import fs from 'fs';

const remove = (pathToFile, cb = () => {}) => {
    fs.access(pathToFile, fs.F_OK, err => {
        if (err) {
            console.log('Operation failed');
        } else {
            fs.unlink(pathToFile, err => {
                if (err) console.log(err);
                cb();
            })

        }
    })
};

export default remove;
