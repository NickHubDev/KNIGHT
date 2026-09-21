import { EmbedBuilder, Events, Interaction, MessageFlags, AttachmentBuilder } from "discord.js";
import 'dotenv/config';
import { createCanvas, loadImage } from "@napi-rs/canvas";

export default {
  name: Events.InteractionCreate,
  once: false,

  async execute(interaction:Interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "ban-form") {

    }

    else if (interaction.customId === "waiting-form") {
      const title = interaction.fields.getTextInputValue("title");
      const body = interaction.fields.getTextInputValue("body");
      
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
      const attachment = new AttachmentBuilder(buffer, { name: 'waiting-card.png' });

      const embed = new EmbedBuilder()
          .setColor([255, 77, 77])
          .setTitle(`🚨 Acción Disciplinaria: Ban`)
          .setDescription(`El usuario ${member} ha sido vetado del servidor de manera exitosa.`)
          .setImage('attachment://waiting-card.png')
          .setTimestamp();

      await interaction.reply({
        flags: MessageFlags.Ephemeral,
        embeds: [embed],
        files: [attachment]
      })
    } 
  }
};