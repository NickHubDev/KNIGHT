import client from '#/client';
import { Client, Events, Interaction } from 'discord.js';
import chalk from 'chalk';

export default {
    name: Events.ClientReady,
    once: true,

    async execute(readyClient: Client<true>) {
        console.log(chalk.bold.magenta(`KNIGHT IS RUNNING AS ${readyClient.user.tag}`));
        readyClient.user.setStatus('idle');
    }
}

