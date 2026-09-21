import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Asegurate de que Knight esta funcionando.'),
  async execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: `Gracias por preocuparte por el estado de **Knight**`,
      flags: 64
    });
  }
}
