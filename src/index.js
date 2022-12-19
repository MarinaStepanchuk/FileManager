import os from 'os';
import path from 'path';
import getOsInfo from "./osModule/index.js";
import exit from "./exitModule/index.js";
import showListForDirectory from "./lsModule/index.js";
import {checkNavigation} from "./navigationModule/index.js";
import {createPath, currentDirNotification, isInputCommandValid, parseInput} from './utils.js';
import calculateHash from "./hashModule/index.js";
import {compress, decompress} from "./compressModule/index.js";
import {cat, add, rename, remove, copy} from './fsModule/index.js';

let currentPath = os.homedir();

process.stdin.on('data', async data => {
    const parsedData = parseInput(data.toString());

    if (!isInputCommandValid(parsedData)) {
        console.log('Invalid input')
        return;
    }

    if (parsedData.command === 'cat') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        cat(pathToFile, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'add') {
        add(parsedData.flag1, currentPath, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'cp') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        const pathToDirectory = createPath(parsedData.flag2 || '/', currentPath);
        copy(pathToFile, pathToDirectory, false, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'mv') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        const pathToDirectory = createPath(parsedData.flag2 || '/', currentPath);
        copy(pathToFile, pathToDirectory, true, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'rn') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        rename(pathToFile, parsedData.flag2, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'rm') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        remove(pathToFile, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'up') {
        const newPath = path.join(currentPath, '../');
        if (newPath) {
            await checkNavigation(newPath, () => {
                currentPath = newPath;
            })
        }
        currentDirNotification(currentPath);
    }

    if (parsedData.command === 'cd') {
        const newPath = path.join(currentPath, path.normalize(parsedData.flag1));
        if (newPath) {
            await checkNavigation(newPath, () => {
                currentPath = newPath;
            })
        }
        currentDirNotification(currentPath);
    }

    if (parsedData.command === 'ls') {
        await showListForDirectory(currentPath);
        currentDirNotification(currentPath);
    }

    if (parsedData.command === 'os') {
        getOsInfo(parsedData.flag1);
        currentDirNotification(currentPath);
    }

    if (parsedData.command === 'hash') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        calculateHash(pathToFile, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'compress') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        const pathToDestination = createPath(parsedData.flag2, currentPath);
        compress(pathToFile, pathToDestination, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === 'decompress') {
        const pathToFile = createPath(parsedData.flag1, currentPath);
        const pathToDestination = createPath(parsedData.flag2, currentPath);
        decompress(pathToFile, pathToDestination, () => currentDirNotification(currentPath));
    }

    if (parsedData.command === '.exit') {
        exit();
    }
})

process.on('SIGINT', () => {
    exit();
});

console.log(`Welcome to the File Manager, ${process.env.npm_config_username || 'Anonymus'}!`);
currentDirNotification(currentPath);
