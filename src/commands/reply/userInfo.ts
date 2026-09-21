import { User, SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import path from 'node:path';
import { fileURLToPath } from "node:url";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Recibe una cierta información sobre los usuarios de nuestro servidor.')
    .addUserOption(options =>
        options
        .setName('usuario')
        .setDescription('Si dejas este apartado vacio, entonces la información que se proporcionará sera sobre ti mismo.')
    ),

    async execute(interaction:ChatInputCommandInteraction) {
        const user = interaction.options.getUser('usuario') as User;
        const canvas = createCanvas(1024, 500);
        const ctx = canvas.getContext('2d');

        const rutaFondo = path.join(__dirname, '../../assets/imgs/NIZOBg.png');
        const fondo = await loadImage(rutaFondo);
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

        ctx.save();
        const radio = 120;
        const x = canvas.width / 2;
        const y = 250;

        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatarURL = user.displayAvatarURL({ extension: 'png', size: 512 });
        const avatar = await loadImage(avatarURL);
        ctx.drawImage(avatar, x - radio, y - radio, radio * 2, radio * 2);
        ctx.restore();

        const buffer = canvas.toBuffer('image/png');
        const attachment = new AttachmentBuilder(buffer, { name: 'user-image.png' });

        const embed = new EmbedBuilder()
            .setColor([255, 255, 255])
            .setImage('attachment://user-image.png')
            .setDescription(`# ${user.globalName}\n Este usuario **cuenta con esta información,**
            en caso de ***necesitar más información el bot
            ya es incapaz de proporcionarla por la seguridad
            de los usuarios.***\n\n **Nombre Global:** ${user.globalName}\n
            **Nombre de Usuario:** ${user.username}\n
            **Id de Usuario:** ${user.id}\n\n **¿Es un bot?:** ${user.bot}`)
            .setURL('https://pages.dev');

        interaction.reply({
            embeds:[embed],
            files:[attachment],
            flags:64
        });
    }
}