import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, AttachmentBuilder, GuildMember } from "discord.js";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import chalk from "chalk";

export default {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banea a usuarios por motivos claros, para una mejor experiencia.')
        .addUserOption(options => 
            options
                .setName('usuario')
                .setDescription('Usuario al que quieres efectuar el baneo.')
                .setRequired(true)
        ),
        
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const member = interaction.options.getMember('usuario') as GuildMember;
        if (!member) {
            return interaction.editReply("No se pudo encontrar a ese miembro en el servidor.");
        }

        try {
            const canvas = createCanvas(1024, 520);
            const ctx = canvas.getContext('2d');

            const urlFondo = "https://drive.google.com/file/d/1B9HMMr-HqRX6mRgLnWAjdyN_P11J3T7n/view?usp=sharing"; 
            const fondo = await loadImage(urlFondo);
            ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

            const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 256 });
            const avatarImg = await loadImage(avatarURL);
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(512, 160, 90, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImg, 422, 70, 180, 180);
            ctx.restore();

            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';

            ctx.font = 'bold 48px monospace';
            ctx.fillText(member.user.tag, 512, 310);

            ctx.fillStyle = '#ff4d4d';
            ctx.font = 'bold 64px monospace';
            ctx.fillText('USUARIO BANEADO', 512, 400);

            const buffer = canvas.toBuffer('image/png');
            const attachment = new AttachmentBuilder(buffer, { name: 'ban-card.png' });

            const embed = new EmbedBuilder()
                .setColor([255, 77, 77])
                .setTitle(`🚨 Acción Disciplinaria: Ban`)
                .setDescription(`El usuario ${member} ha sido vetado del servidor de manera exitosa.`)
                .setImage('attachment://ban-card.png')
                .setTimestamp();

            await interaction.editReply({
                embeds: [embed],
                files: [attachment]
            });

            await member.ban({ reason: 'Baneado mediante comando' });

        } catch (error) {
            console.error(chalk.red("Error al generar la imagen de Canvas:"), error);
            await interaction.editReply("Hubo un error interno al intentar procesar la imagen del ban.");
        }
    }
};
