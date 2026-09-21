import chalk from "chalk";
import { ChannelType, ChatInputCommandInteraction, SlashCommandBuilder, Snowflake, TextChannel, User, Collection, Message } from "discord.js";
import "dotenv/config";

export default {
    data: new SlashCommandBuilder()
        .setName("clearchannel")
        .setDescription("Limpia la cantidad de mensajes de un usuario que desees con un solo comando")
        .addUserOption(options =>
            options
                .setName("user")
                .setDescription("Proporciona el usuario del que quieres eliminar los mensajes")
                .setRequired(true)
        )
        .addNumberOption(options =>
            options
                .setName("quantity")
                .setDescription("Cantidad de mensajes que deseas borrar")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(1000)
        )
        .addChannelOption(options =>
            options
                .addChannelTypes(ChannelType.GuildText)
                .setName("channel")
                .setDescription("Canal del que quieres eliminar los mensajes")
                .setRequired(true)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ ephemeral: true });

        const user = interaction.options.getUser("user", true) as User;
        const channel = interaction.options.getChannel("channel", true) as TextChannel;
        let quantity = interaction.options.getNumber("quantity", true) as number;

        let before: Snowflake | undefined;
        let totalDeleted = 0;

        const timeOut = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        while (quantity > 0) {
            // 1. Obtener mensajes históricos del canal (máximo 100 por petición)
            const mSelected: Collection<string, Message> = await channel.messages.fetch({
                limit: 100,
                before
            });

            const messagesArray = Array.from(mSelected.values());

            // Si ya no hay más mensajes en el historial del canal, rompemos el bucle
            if (messagesArray.length === 0) {
                break;
            }

            // 2. Filtrar únicamente los mensajes que pertenecen al usuario objetivo
            const messagesToDelete: Message[] = [];
            for (const msg of messagesArray) {
                if (messagesToDelete.length >= quantity) break;

                // Solo agregamos si coincide el ID de autor y el mensaje tiene menos de 14 días (bulkDelete crash prevention)
                const catorceDiasEnMs = 14 * 24 * 60 * 60 * 1000;
                const esValidoParaBulk = (Date.now() - msg.createdTimestamp) < catorceDiasEnMs;

                if (msg.author.id === user.id && esValidoParaBulk) {
                    messagesToDelete.push(msg);
                }
            }

            // Actualizamos el puntero "before" con el último mensaje evaluado del lote para la siguiente vuelta
            const lastMessage = messagesArray.at(-1);
            if (!lastMessage) break;
            before = lastMessage.id;

            // 3. Ejecutar la eliminación masiva (máximo 100 por API request)
            if (messagesToDelete.length > 0) {
                try {
                    // Si el filtro recolectó solo 1 mensaje, bulkDelete no funciona (mínimo requiere 2), usamos delete manual
                    if (messagesToDelete.length === 1) {
                        await messagesToDelete[0].delete();
                    } else {
                        await channel.bulkDelete(messagesToDelete);
                    }

                    const deletedThisRound = messagesToDelete.length;
                    quantity -= deletedThisRound;
                    totalDeleted += deletedThisRound;

                    await interaction.editReply(
                        `Se han eliminado ${totalDeleted} mensajes de **${user.tag}**. Restan ${quantity} por buscar.`
                    );

                } catch (err) {
                    console.error(chalk.bgRed("Error al borrar mensajes:"), err);
                    break;
                }
            }

            // 4. Si aún queda cantidad pendiente, esperamos para evitar el Rate Limit (Ratelimit de Discord)
            if (quantity > 0) {
                console.log(chalk.bold.gray("Esperando 3 segundos para evitar rate-limits..."));
                await timeOut(3000); // 30 segundos era demasiado tiempo muerto para el usuario, 3s es balanceado.
            }
        }

        await interaction.editReply(`✅ Limpieza completada. Se eliminaron con éxito un total de **${totalDeleted}** mensajes de **${user.tag}**.`);
    }
};
