const { prefix } = require('../../src/config');
const Guilds = require('../../src/models/guilds');

module.exports = {
  name: 'setprefix',
  aliases: ['prefix'],
  usages: ['setprefix (Prefix)'],
  examples: ['setprefix #'],
  cooldown: 10,
  permissions: ['ADMINISTRATOR'],
  async execute (message, args, client) {
    
    const replys = client.cmdReplys;
    
    let newPrefix = (args.length) ? args[0] : prefix;
    await Guilds.setPrefix(message.guild.id, newPrefix);
    message.react('✅');
    
  }
}