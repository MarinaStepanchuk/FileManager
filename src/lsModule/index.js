import fs from 'fs';

const showListForDirectory = async currentPath => {
    fs.stat(currentPath, err => {
        if (err) {
            throw new Error('Operation failed');
        } else {
            fs.readdir(currentPath, {withFileTypes: true}, (err, files) => {
                const parsedItems = files.map(
                    file => ({'Name': file.name, 'Type': file.isDirectory() ? 'directory' : 'file'})
                ).sort((a, b) => {
                    const nameA = a.Name.toLowerCase();
                    const nameB = b.Name.toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                });
                console.table(parsedItems);
            });
        }
    })
};

export default showListForDirectory;
