require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

// ====== SERVIDOR WEB (Render 24/7) ======
const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Bot funcionando 24/7 🚀");
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor web activo en puerto ${PORT}`);
});

// ====== DISCORD ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const levels = {};

client.once("ready", () => {
  console.log(`🤖 ${client.user.tag} está online 24/7.`);
});

client.on("guildMemberAdd", (member) => {
  const canal = member.guild.systemChannel;
  if (!canal) return;

  canal.send(
    `👋 Bienvenido ${member} a **Club Studios** 🔥\nDisfruta tu estadía 🚀`
  );
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // ===== Sistema de niveles =====
  if (!levels[message.author.id]) levels[message.author.id] = 0;
  levels[message.author.id]++;

  // ===== Comando !hola =====
  if (message.content.startsWith("!hola")) {
    const mencionado = message.mentions.users.first();

    if (mencionado) {
      return message.channel.send(
        `👋 ${message.author.username} saluda a ${mencionado} 💙`
      );
    } else {
      return message.channel.send(
        `👋 Hola ${message.author} 🔥 Bienvenido a Club Studios`
      );
    }
  }

  // ===== Comando !nivel =====
  if (message.content === "!nivel") {
    return message.channel.send(
      `📊 ${message.author} tienes ${levels[message.author.id]} mensajes enviados.`
    );
  }

  // ===== Comando !info =====
  if (message.content === "!info") {
    return message.channel.send(
      `🤖 Soy el bot oficial de Club Studios.\nComandos disponibles:\n!hola\n!nivel\n!info`
    );
  }
});

client.login(process.env.TOKEN);
