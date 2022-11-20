import { Builder } from './buidler.ts';
import { createServer } from './server.ts';

const scriptName = Deno.args[0];

switch (scriptName) {
    case 'build':
        new Builder().build();
        break;
    case 'watch':
        new Builder().watch();
        createServer();
        break;
    default:
        throw new Error('Add script name')

}

