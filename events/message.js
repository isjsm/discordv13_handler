const { MessageEmbed, Collection } = require('discord.js');
const { language, prefix, owners } = require('../src/config');
const Guilds = require('../src/models/guilds');
const cooldowns = new Collection();

module.exports = (client) => ({
  name: 'messageCreate',
  once: false,
  async execute (message) {
    
    if (message.author.bot) return;
    
    const guildData = await Guilds.findOne({ guildId: (message.guild) ? message.guild.id : '' });
    client.language = (guildData && guildData.language && client.languages.includes(guildData.language)) ? guildData.language : language;
    client.prefix = (guildData && guildData.prefix) ? guildData.prefix : prefix;
     
    if (!message.content.startsWith(client.prefix)) return;
    
    const args = message.content.slice(client.prefix.length).replace(/\[٠-٩]/g, e => "٠١٢٣٤٥٦٧٨٩".indexOf(e)).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    
    client.languageJson = require('../src/languages/' + client.language);
    client.generalReplys = client.languageJson.general;
    client.cmdReplys = client.languageJson[command.name];
    //if (!cmdReplys) throw new Error(`${command.name} It doesn't have replays.`);
    
    if (command.owner && !owners.includes(message.author.id)) return;
    if (command.dm && message.guild) return message.reply(client.generalReplys.cmdDm)
      .then(msg => {    
      setTimeout(async () => {
        msg.delete().catch(err => 400);
        message.delete().catch(err => 400);
      }, 2500);
    });
    
    if (!owners.includes(message.author.id)) {
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
      }
      let now = Date.now();
      let timestamps = cooldowns.get(command.name);
      let cooldownAmount = (command.cooldown || 3) * 1000;
      if (timestamps.has(message.author.id)) {
        let expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          let timeLeft = (expirationTime - now) / 1000;
          if (!cooldowns.has(message.author.id)) {
            cooldowns.set(message.author.id, true);
            return message.reply(client.generalReplys.timeOut(timeLeft.toFixed(1)))
              .then(msg => {  
              setTimeout(async () => {
                msg.delete().catch(err => 400);
                message.delete().catch(err => 400);
              }, 2500);
            });
          } else return;
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => {
        timestamps.delete(message.author.id);
        cooldowns.delete(message.author.id);
      }, cooldownAmount);
    }
    
    if (command.permissions && !message.member.permissions.has(command.permissions)) return message.reply(client.generalReplys.noPermissions(command.permissions.join(', ')));
    if (command.args && !args.length) {
      args[0] = command.name;
      let helpCmd = client.commands.get("help");
      client.cmdReplys = client.languageJson[helpCmd.name];
      return helpCmd.execute(message, args, client);
    }
    
    try {
      return command.execute(message, args, client);
    } catch (err) {
      return console.error(err);
    }
    
  }
});