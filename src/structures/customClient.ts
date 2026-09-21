import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js'

class CustomClient extends Client {
    public commands = 
    new Collection<
    string,
    Function
    >();

    constructor() {
        super({
            intents:[
                GatewayIntentBits.GuildExpressions,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessagePolls,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.Guilds
            ],
            partials:[
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Poll,
                Partials.PollAnswer,
                Partials.Reaction,
                Partials.SoundboardSound,
                Partials.User
            ],
            allowedMentions: {
                parse: ["everyone", "roles", "users"],
                repliedUser: true,
            },
            failIfNotExists: false,
        });
    }
};

export default CustomClient;
