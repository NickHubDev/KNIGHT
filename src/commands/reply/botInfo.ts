import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } from "discord.js";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { fileURLToPath } from 'node:url';
import path from 'node:path';


export default {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Consigue la información del bot.'),
    async execute(interaction:ChatInputCommandInteraction) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const canvas = createCanvas(1024, 500);
        const ctx = canvas.getContext('2d');

        const rutaFondo = path.join(__dirname, '../../assets/imgs/NIZOBg.png');
        const fondo = await loadImage(rutaFondo);
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

        ctx.save();
        const radio = 120;
        const x = canvas.width / 2;
        const y = 160;

        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const buffer = canvas.toBuffer('image/png'); 
        const attachment = new AttachmentBuilder(buffer, { name: 'image.png' });

        const embed = new EmbedBuilder()
        .setColor([255, 255, 255])
        .setImage('attachment://image.png')
        .setDescription('# KNIGHT\nKnight es el bot oficial de NIZ00LAX, usado para unificar todos los bots en uno solo.\nSi bien desarrollarlo no es sencillo, aún le queda mucho y las cosas pueden cambiar.\n\nEsperamos que lo useis a menudo :D')
        .setURL('https://knightBot.pages.dev')

        interaction.reply({
            embeds: [embed],
            files: [attachment],
            flags: MessageFlags.Ephemeral
        });
    }
}

