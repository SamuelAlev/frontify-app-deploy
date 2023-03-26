import { getInput, setFailed } from '@actions/core';

import { deploy } from './frontify';

async function run(): Promise<void> {
    try {
        const token = getInput('token');
        const instanceDomain = getInput('instanceDomain');
        const extraArgs = getInput('args');
        const path = getInput('path');

        await deploy(token, instanceDomain, path, extraArgs);
    } catch (error) {
        setFailed(error as Error | string);
    }
}

run();
