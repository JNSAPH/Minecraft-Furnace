import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '@/utils/logger';
const { exec } = require('child_process');

export async function downloadFile(url: string, fileName: string, destination: string): Promise<void> {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    const writer = fs.createWriteStream
        (path.join(destination, fileName));

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

export async function createFolder(name: string, destination: string): Promise<void> {
    const folderPath = path.join(destination, name);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}

export async function runServerJAR(jarPath: string, serverFolder: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = exec(`java -jar ${jarPath}`, { cwd: serverFolder });

        child.stdout.on('data', (data: Buffer) => {
            logger.debug(data.toString());
        });

        child.stderr.on('data', (data: Buffer) => {
            logger.error(data.toString());
        });

        child.on('close', (code: number) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Server JAR exited with code ${code}`));
            }
        });

        child.on('error', (error: Error) => {
            reject(error);
        });
    });
}

export async function acceptEULA(serverFolder: string): Promise<void> {
    const content = await fs.readFileSync(path.join(serverFolder, 'eula.txt'), 'utf-8').replace('eula=false', 'eula=true');

    fs.writeFileSync(path.join(serverFolder, 'eula.txt'), content);
}

export async function modifyServerProperties(serverFolder: string, properties: { [key: string]: string }): Promise<void> {
    // get content of file 
    const content = await fs.readFileSync(path.join(serverFolder, 'server.properties'), 'utf-8');
    
    // replace only keys that are in the properties object
    const newContent = content.split('\n').map(line => {
        const [key, value] = line.split('=');

        if (key in properties) {
            return `${key}=${properties[key]}`;
        }

        return line;
    }).join('\n');
    
    await fs.writeFileSync(path.join(serverFolder, 'server.properties'), newContent);
}