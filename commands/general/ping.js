const { MessageEmbed } = require('discord.js');
const { messageObject } = require('../../src/util');

module.exports = {
  name: 'ping',
  usages: ['ping'],
  examples: ['ping'],
  cooldown: 10,
  async execute (message, args, client) {
    
    let now_time = Date.now();
    let msg = await message.reply(messageObject({ content: client.cmdReplys.pong }));
    let embed = new MessageEmbed()
    .setColor(client.embedColor)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`**📊 Time Taken: ${Date.now() - now_time} ms\n🌐 Web Socket: ${client.ws.ping} ms**`);
    
    await msg.edit(messageObject({ embed }));
    
  }
}