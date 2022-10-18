import { readdir, cp, rm, mkdir, readFile, writeFile } from 'node:fs/promises';
import { config } from './config.mjs';

(async () => {

    console.log(config.sourceDir);
    const dir = await readdir(config.sourceDir);

    await rm(config.dist, { recursive: true, force: true });
    await mkdir(config.dist);
    await cp(config.sourceDir, config.dist, { recursive: true });

    let componentsSrc = ``;

    async function getComponentSrcFromDir(dir) {
        const paths = await readdir(dir);

        for (let path of paths) {
            if (path.indexOf('.component.html') !== -1) {
                console.log(dir + path);
                componentsSrc += await readFile(dir + path, { encoding: 'utf-8' });
                await rm(dir + path);
            } else if (path.indexOf('.') === -1) {
                await getComponentSrcFromDir(dir + path + '/');
            }
        }

        return Promise.resolve();
    }

    await getComponentSrcFromDir(config.dist);

    const indexPath = config.dist + 'index.html';

    let indexContent = await readFile(indexPath, { encoding: 'utf-8' });
    indexContent = indexContent.replace('</body>', componentsSrc + '</body>');
    writeFile(indexPath, indexContent);


})();

