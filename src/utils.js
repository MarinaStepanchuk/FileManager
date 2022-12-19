import path from "path";
import {functionsByFlags} from "./osModule/index.js";

export const parseInput = data => ({
    command: data.split(' ')[0]?.replace(/(\r\n|\n|\r)/gm,""),
    flag1: data.split(' ')?.[1]?.replace(/(\r\n|\n|\r)/gm,""),
    flag2: data.split(' ')?.[2]?.replace(/(\r\n|\n|\r)/gm,"")
});

export const currentDirNotification = dir => console.log(`You are currently in ${dir}`);

export const createPath = (newPath, currentPath) => path.isAbsolute(newPath)
    ? path.normalize(newPath)
    : path.join(currentPath, path.normalize(newPath));

const required1flags = incomingCommand => !!incomingCommand.flag1;
const required2flags = incomingCommand => !!incomingCommand.flag1 && !!incomingCommand.flag2;
const requiredDashDashParam = (incomingCommand, allowed) => !!incomingCommand.flag1 && !!allowed.includes(incomingCommand.flag1);


const validations = {
    cat: required1flags,
    add: required1flags,
    cp: required2flags,
    mv: required2flags,
    rm: required1flags,
    rn: required2flags,
    os: requiredDashDashParam,
    hash: required1flags,
    compress: required2flags,
    decompress: required2flags,
    cd: required1flags,
    '.exit': () => true,
    ls: () => true,
    up: () => true,
}

export const isInputCommandValid = incomingCommand => {
    try {
        if (incomingCommand.command === 'os') {
            return validations[incomingCommand.command](incomingCommand, Object.keys(functionsByFlags));
        } else {
            return validations[incomingCommand.command](incomingCommand);
        }
    } catch {
        return false;
    }
}
