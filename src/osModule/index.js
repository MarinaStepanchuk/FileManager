import os from "os";

const eol = () => console.log(JSON.stringify(os.EOL));
const cpus = () => {
    const cpus = os.cpus().map(cpu => ({
        Model: cpu.model,
        Speed: `${cpu.speed/1000} GHz`
    }));
    console.log(`Overall amount of CPUS: ${cpus.length}`);
    console.table(cpus);
}
const homedir = () => console.log(os.homedir());
const username = () => console.log(os.userInfo().username);
const architecture = () => console.log(os.arch());

export const functionsByFlags = {
    '--EOL': eol,
    '--cpus': cpus,
    '--homedir': homedir,
    '--username': username,
    '--architecture': architecture,
}

const getOsInfo = flag => functionsByFlags[flag]?.();

export default  getOsInfo;
