import { ActionRowBuilder, ChatInputCommandInteraction, MessageFlags, ModalBuilder, ModalSubmitInteraction, SlashCommandBuilder, TextChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import client from '#/client';
import 'dotenv/config';

export default {
    data: new SlashCommandBuilder()
    .setName('waiting')
    .setDescription('Haz que un usuario se vea temporalmente incapaz de hacer nada.')
    .addUserOption(options =>
        options
        .setName('usuario')
        .setDescription('Usuario al que quieres aplicar el baneo.')
        .setRequired(true)
    ),

    async execute(interaction:ChatInputCommandInteraction) {
        const user = interaction.options.getMember('usuario');
        const channelId = process.env['moderationChannel'] as any;
        const channel = client.channels.cache.get(channelId) as TextChannel;

        const form = new ModalBuilder()
        .setCustomId('waiting-form')
        .setTitle('Formulario para Efectuar Baneo');

        const title = new TextInputBuilder()
        .setCustomId('title')
        .setMaxLength(50)
        .setMinLength(10)
        .setStyle(TextInputStyle.Short)
        .setLabel('Definición')
        .setPlaceholder('Define brevemente, siempre con respeto...')
        .setRequired(true);

        const body = new TextInputBuilder()
        .setCustomId('body')
        .setStyle(TextInputStyle.Paragraph)
        .setLabel('Desarrollo')
        .setPlaceholder('Desarrolla la situación pero sin pasarte ;)')
        .setMaxLength(300)
        .setMinLength(40)
        .setRequired(true);

        const rowTitle = new ActionRowBuilder<TextInputBuilder>().addComponents(title);
        const rowBody = new ActionRowBuilder<TextInputBuilder>().addComponents(body);

        form.addComponents(rowTitle, rowBody);

        

        await interaction.showModal(form);
    }
}