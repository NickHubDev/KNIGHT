import client from '#/client';
import { loadEvents } from '@/handlers/event';
import { loadCommands } from '@/handlers/command';
import chalk from 'chalk';
import 'dotenv/config';

const TOKEN = process.env['TOKEN'];

async function starting() {
  loadEvents();
  await loadCommands();
  if (TOKEN) {
    console.log(chalk.bold.blueBright(`Knight is starting... Please wait.`));
    try {
      client.login(TOKEN);
      console.log(chalk.bold.greenBright(`Knight started perfecttly as ${client.user?.username}`));
    } 
    catch (err) {
      console.error(chalk.bold.redBright(`Error detected: [${err}]`));
    }
  }
};

starting();
