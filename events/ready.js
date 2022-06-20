const { presence } = require('../src/config');

module.exports = (client) => ({
  name: 'ready',
  once: true,
  async execute() {
    
    client.user.setPresence(presence);
    console.log(`${client.user.tag} Is Online !`);
    
  }
});