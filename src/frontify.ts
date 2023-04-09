import { globSync } from 'glob';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';

const CONFIG_PATH = `${process.env.XDG_CONFIG_HOME}/frontify-cli-nodejs/config.json`;

export const deploy = async (
    token: string,
    instanceDomain: string,
    pathGlob: string,
    extraArgs: string
): Promise<void> => {
    writeConfigFile(token, instanceDomain);

    const appPaths = globSync(pathGlob);
    console.log(`Found ${appPaths.length} apps for path "${pathGlob}":`);
    console.log(`- ${appPaths.join('\n- ')}`);

    if (appPaths.length === 0) {
        throw new Error(`No apps found for path "${pathGlob}"!`);
    }

    for (const appPath of appPaths) {
        console.log(`Start deploying "${appPath}" to ${instanceDomain}...`);
        await deployApp(appPath, extraArgs);
        console.log(`Deployed "${appPath}"!`);
    }
};

const deployApp = async (path: string, extraArgs: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(`cd ${path} && npx frontify-cli deploy ${extraArgs}`, [], { shell: true });

        childProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        childProcess.stderr.on('data', (data) => {
            console.log(data.toString());
        });

        childProcess.on('exit', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(`Deployment failed for "${path}" with code ${code}`);
            }
        });
    });
};

const writeConfigFile = (token: string, instanceUrl: string): void => {
    const configDir = dirname(resolve(CONFIG_PATH));

    if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true });
    }

    writeFileSync(
        resolve(CONFIG_PATH),
        JSON.stringify({
            instanceUrl,
            tokens: {
                token_type: 'Bearer',
                access_token: token,
            },
        }),
        'utf8'
    );
};
