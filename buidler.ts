const DIST = './dist';
const SRC = './src';
const INDEX_FILE = 'index.html';
const COMPONENT_NAME_MATCH = '.component.html';

import { copy } from "https://deno.land/std/fs/copy.ts";

export class Builder {
    decoder = new TextDecoder('utf-8')
    encoder = new TextEncoder();

    constructor() {
    }

    async getCompoenentSrc(dirPath: string): Promise<string> {
        let componentsHTML = '';

        for await (const entry of Deno.readDir(dirPath)) {
            const entryPath = dirPath + '/' + entry.name;

            if (entry.isDirectory) {
                componentsHTML + await this.getCompoenentSrc(entryPath);
            } else if (entry.isFile && entry.name.match(COMPONENT_NAME_MATCH)) {
                componentsHTML += this.decoder.decode(Deno.readFileSync(entryPath));
                Deno.remove(entryPath);
            }
        }

        return Promise.resolve(componentsHTML);
    }

    async build(): Promise<void> {
        console.log('Building Start!');

        await Deno.remove(DIST, { recursive: true });
        await copy(SRC, DIST)

        const componentSrc = await this.getCompoenentSrc(DIST);
        const indexSrc = this.decoder.decode(Deno.readFileSync(DIST + '/' + INDEX_FILE))

        const indexSrcWithComponents = indexSrc.replace('</body>', componentSrc + '</body>');

        Deno.writeFileSync(DIST + '/' + INDEX_FILE, this.encoder.encode(indexSrcWithComponents))

        console.log('Building Complete!');
        return Promise.resolve();
    }

    async watch(): Promise<void> {
        for await (const event of Deno.watchFs(SRC)) {
            console.log('CHANGE', event.kind, event.paths);
            await this.build();
        }
    }
}
