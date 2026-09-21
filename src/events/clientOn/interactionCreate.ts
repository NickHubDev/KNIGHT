import { Events, MessageFlags, Interaction } from "discord.js";
import client from "#/client";
import chalk from "chalk";

export default {
  name: Events.InteractionCreate,
  once: false,

  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        chalk.bold.redBright(
          `No command named ${interaction.commandName}, please check it out.`
        )
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(chalk.bold.red(`Error: ${err}`));

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Hubo un error al ejecutar el comando.",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "Hubo un error al ejecutar el comando.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
