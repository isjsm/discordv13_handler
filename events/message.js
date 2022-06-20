const { prefix } = require('../config/config.js');
const cooldown = new Set();

module.exports = {
  name: 'message',
  
  async execute(client, message) {
    
    try{
     if (!message.content.startsWith(prefix) || message.author.bot) return;

     const args = message.content.replace(/[٠-٩]/g, e => '٠١٢٣٤٥٦٧٨٩'.indexOf(e)).slice(prefix.length).trim().split(/ +/);

     const command = args.shift().toLowerCase();

     const commands = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

     if (!commands) return;
 
     if (commands.cooldown){ 
     if (cooldown.has(`${commands.name}-${message.author.id}`)) {
       
       return message.reply({content: `you can use this command after ${commands.cooldown}`}).then( m => {
         
         setTimeout( () => {})
         
       })// end of then
       
      }// end of if condition
       
    }
     commands.execute(client, message, args)

    }catch(error){

     console.error(error);
     message.reply('there was an error trying to execute that command!');


    }
    
    
  }
}