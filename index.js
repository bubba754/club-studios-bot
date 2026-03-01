const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

client.once('ready', () => {
  console.log('Bot encendido 💙');
});

client.on('messageCreate', message => {
  if (message.content === '!hola') {
    message.reply(`Hola ${message.author.username} 🐺✨`);
  }
});

client.login(process.env.TOKEN);
