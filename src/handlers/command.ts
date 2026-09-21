import client from '#/client'
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { REST, Routes } from 'discord.js';
import 'dotenv/config';

async function loadCommands() {

    const TOKEN = process.env['TOKEN'];
    const clientId = process.env['clientId'];
    const guildId = process.env['guildId'];

    const commands = [];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const commandsPath = path.join(__dirname, '..', 'commands');

    const folders = fs.readdirSync(commandsPath);

    for (const folder of folders) {
        const folderPath = path.join(commandsPath, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const filePath = path.join(folderPath, file);
            const command = await import(pathToFileURL(filePath).href);
            const create = command.default;
        

            if ('data' in create && 'execute' in create) {
                commands.push(create.data.toJSON());
            } else {
                console.error(chalk.bold.red(`[WARNING] The command has an error, chek it out`));
            }

            client.commands.set(create.data.name, create)
            console.log(chalk.bold.green(`✅ Command ${create.data.name} loaded: execute function verified`));
        }
    };

    const rest = new REST().setToken(TOKEN!);

        try {
            console.log(chalk.bold.blueBright(`${commands.length} commands are handling, wait some seconds, please...`));
            const data = await rest.put(Routes.applicationGuildCommands(clientId!,guildId!), { body: commands });
            console.log(chalk.bold.magentaBright(`${commands.length} commands could be sent`));
        } catch (err) {
            console.log(chalk.bold.red(`The commands couldnt be sent, check it: [${err}]`));
        }
};

export { loadCommands };
