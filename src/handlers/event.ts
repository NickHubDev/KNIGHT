import client from '#/client'
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL, Url } from 'node:url';

async function loadEvents() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const eventsPath = path.join(__dirname, '..', 'events');
    const folders = fs.readdirSync(eventsPath);

    for (const folder of folders) {
        const folderPath = path.join(eventsPath, folder);
        const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.ts'));
        for (const file of eventFiles) {
            const filePath = path.join(folderPath, file);
            const eventDefault = await import(pathToFileURL(filePath).href);
            const event = eventDefault.default;
            
            if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
};

export { loadEvents };