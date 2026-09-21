import customClient from '@/structures/customClient';
import chalk from 'chalk';

const client = new customClient();

if(client) {
  console.log(chalk.bold.greenBright('The customClient has charged! All fine'));
}

else {
  console.error(chalk.bold.redBright(`Client wasn't able to charge.`));
}

export default client;