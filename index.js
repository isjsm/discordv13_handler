const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const {readdirSync} = require('fs');
const Discord = require('discord.js');






const client = new Client({
 allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
    intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_BANS, 
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
    Intents.FLAGS.GUILD_INTEGRATIONS, 
    Intents.FLAGS.GUILD_WEBHOOKS, 
    Intents.FLAGS.GUILD_INVITES, 
    Intents.FLAGS.GUILD_VOICE_STATES, 
    Intents.FLAGS.GUILD_PRESENCES, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
    Intents.FLAGS.GUILD_MESSAGE_TYPING, 
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});




client.cooldowns = new Discord.Collection();
client.commands = new Collection();


//commands file
const commandFolders = readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

//events file
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
  

	

  
	
  
  

client.login(process.env.TOKEN);

