import {
  AttachmentBuilder,
  EmbedBuilder,
  Events,
  GuildMember,
} from "discord.js";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  name: Events.GuildMemberAdd,
  once: false,

  async execute(member: GuildMember) {
    async function sendWelcome(envName: string) {
      try {
        const canvas = createCanvas(1024, 500);
        const ctx = canvas.getContext("2d");

        const background = await loadImage(
          path.join(__dirname, "../assets/imgs/NIZOBg.png")
        );

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const radius = 120;
        const x = canvas.width / 2;
        const y = 160;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.clip();

        const avatar = await loadImage(
          member.user.displayAvatarURL({
            extension: "png",
            size: 256,
          })
        );

        ctx.drawImage(avatar, x - radius, y - radius, radius * 2, radius * 2);
        ctx.restore();

        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";

        ctx.font = "bold 50px monospace";
        ctx.fillText("¡BIENVENIDO/A!", canvas.width / 2, 350);

        ctx.font = "40px monospace";
        ctx.fillStyle = "#5b1edf";
        ctx.fillText(member.user.username, canvas.width / 2, 410);

        const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
          name: "welcome.png",
        });

        const embed = new EmbedBuilder()
          .setColor(0xffffff)
          .setImage("attachment://welcome.png");

        const channelId = process.env[envName];

        if (!channelId) {
          console.error(chalk.red(`Variable ${envName} no configurada.`));
          return;
        }

        const channel = member.guild.channels.cache.get(channelId);

        if (channel?.isTextBased()) {
          await channel.send({
            embeds: [embed],
            files: [attachment],
          });
        }
      } catch (err) {
        console.error(chalk.redBright("[Welcome Error]"), err);
      }
    }

    if (member.user.bot) {
      await sendWelcome("welcomeBotChannel");
    } else {
      await sendWelcome("welcomeChannel");
    }
  },
};