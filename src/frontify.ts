import { spawn } from 'node:child_process';
import { info } from '@actions/core';
import { globSync } from 'glob';

export const deploy = async (
    token: string,
    instanceDomain: string,
    pathGlob: string,
    extraArgs: string,
): Promise<void> => {
    const appPaths = globSync(pathGlob);
    info(`Found ${appPaths.length} apps for path "${pathGlob}":`);
    info(`- ${appPaths.join('\n- ')}`);

    if (appPaths.length === 0) {
        throw new Error(`No apps found for path "${pathGlob}"!`);
    }

    for (const appPath of appPaths) {
        info(`Start deploying "${appPath}" to ${instanceDomain}...`);
        await deployApp(appPath, `--token ${token} --instance ${instanceDomain}`, extraArgs);
        info(`Deployed "${appPath}"!`);
    }
};

const deployApp = async (path: string, ...extraArgs: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(`cd ${path} && npx frontify-cli deploy ${extraArgs.join(' ')}`, [], { shell: true });

        childProcess.stdout.on('data', (data) => {
            info(data.toString());
        });

        childProcess.stderr.on('data', (data) => {
            info(data.toString());
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
