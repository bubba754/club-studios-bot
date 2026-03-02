require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const OpenAI = require("openai");

// ====== SERVIDOR WEB (para Render) ======
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot funcionando 24/7 🚀");
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor web activo en puerto ${PORT}`);
});
// =========================================

// ====== DISCORD ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const levels = {};

client.once("ready", () => {
  console.log(`🤖 ${client.user.tag} está online 24/7.`);
});

client.on("guildMemberAdd", (member) => {
  const canal = member.guild.systemChannel;
  if (!canal) return;

  canal.send(
    `👋 Bienvenido ${member} a Club Studios 🔥
Prepárate para eventos y noticias 🚀`
  );
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (!levels[message.author.id]) levels[message.author.id] = 0;
  levels[message.author.id]++;

  if (message.content.startsWith("!hola")) {
    const mencionado = message.mentions.users.first();

    if (mencionado) {
      message.channel.send(
        `👋 ${message.author.username} saluda a ${mencionado.username} 💙`
      );
    } else {
      message.channel.send(
        `👋 Hola ${message.author.username} (${message.author.tag}) 🔥`
      );
    }
  }

  if (message.mentions.has(client.user)) {
    try {
      const pregunta = message.content.replace(
        `<@${client.user.id}>`,
        ""
      );

      const respuesta = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres el asistente oficial de Club Studios. Responde amigable y profesional.",
          },
          {
            role: "user",
            content: pregunta,
          },
        ],
      });

      message.reply(respuesta.choices[0].message.content);

    } catch (error) {
      console.error(error);
      message.reply("⚠️ Error al conectar con la IA.");
    }
  }
});

client.login(process.env.TOKEN);
