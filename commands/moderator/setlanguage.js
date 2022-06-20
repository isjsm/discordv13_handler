const { messageObject } = require('../../src/util');
const Guilds = require('../../src/models/guilds');

module.exports = {
  name: 'setlanguage',
  aliases: ['setlang'],
  usages: ['setlanguage (Language Code)'],
  examples: ['setlanguage ar'],
  cooldown: 10,
  args: true,
  permissions: ['ADMINISTRATOR'],
  async execute (message, args, client) {
    
    var replys = client.cmdReplys;
    
    let newLanguage = args[0].toLowerCase();
    if (!client.languages.includes(newLanguage)) return message.reply(messageObject({ content: replys.notFoundLanguage(client.languages.join(', ')) }));
    
    replys = require(`../../src/languages/${newLanguage}`)[this.name];
    await Guilds.setLanguage(message.guild.id, newLanguage);
    message.reply(messageObject({ content: replys.done }));
    
  }
}