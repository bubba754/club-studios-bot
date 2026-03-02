require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const OpenAI = require("openai");

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

const prefix = "!";
const levels = {};

client.once("ready", () => {
  console.log(`🤖 ${client.user.tag} está online 24/7.`);
});

client.on("guildMemberAdd", (member) => {
  const canal = member.guild.systemChannel;
  if (!canal) return;

  canal.send(
    `👋 Bienvenido ${member} a **Club Studios** 🔥
Lee las reglas y prepárate para eventos épicos.
Tu aventura empieza ahora 🚀`
  );
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Sistema de niveles
  if (!levels[message.author.id]) levels[message.author.id] = 0;
  levels[message.author.id]++;

  if (levels[message.author.id] === 25) {
    message.channel.send(
      `🌟 ${message.author} subió de nivel por su actividad 🔥`
    );
  }

  // !hola personalizado
  if (message.content.startsWith("!hola")) {
    const mencionado = message.mentions.users.first();

    if (mencionado) {
      message.channel.send(
        `👋 ${message.author.username} le manda un saludo especial a ${mencionado.username} 💙`
      );
    } else {
      message.channel.send(
        `👋 Hola ${message.author.username} (${message.author.tag}) 🔥`
      );
    }
  }

  // !info
  if (message.content === "!info") {
    message.channel.send(
      `👤 Nombre: ${message.author.username}
🏷 Tag: ${message.author.tag}
⭐ Nivel: ${levels[message.author.id]}`
    );
  }

  // !random
  if (message.content === "!random") {
    const frases = [
      "🚀 El éxito empieza con disciplina.",
      "🔥 Hoy puede ser tu mejor día.",
      "🎯 Enfócate y conquista.",
      "🌌 El futuro es de los valientes."
    ];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    message.channel.send(frase);
  }

  // IA cuando mencionan al bot
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
              "Eres el asistente oficial de Club Studios. Responde de forma amigable, juvenil y profesional."
          },
          {
            role: "user",
            content: pregunta
          }
        ],
      });

      message.reply(respuesta.choices[0].message.content);

    } catch (error) {
      console.error(error);
      message.reply("⚠️ Error al conectar con la IA.");
    }
  }
});

client.login(process.env.TOKEN);require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const OpenAI = require("openai");

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

const prefix = "!";
const levels = {};

client.once("ready", () => {
  console.log(`🤖 ${client.user.tag} está online 24/7.`);
});

client.on("guildMemberAdd", (member) => {
  const canal = member.guild.systemChannel;
  if (!canal) return;

  canal.send(
    `👋 Bienvenido ${member} a **Club Studios** 🔥
Lee las reglas y prepárate para eventos épicos.
Tu aventura empieza ahora 🚀`
  );
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Sistema de niveles
  if (!levels[message.author.id]) levels[message.author.id] = 0;
  levels[message.author.id]++;

  if (levels[message.author.id] === 25) {
    message.channel.send(
      `🌟 ${message.author} subió de nivel por su actividad 🔥`
    );
  }

  // !hola personalizado
  if (message.content.startsWith("!hola")) {
    const mencionado = message.mentions.users.first();

    if (mencionado) {
      message.channel.send(
        `👋 ${message.author.username} le manda un saludo especial a ${mencionado.username} 💙`
      );
    } else {
      message.channel.send(
        `👋 Hola ${message.author.username} (${message.author.tag}) 🔥`
      );
    }
  }

  // !info
  if (message.content === "!info") {
    message.channel.send(
      `👤 Nombre: ${message.author.username}
🏷 Tag: ${message.author.tag}
⭐ Nivel: ${levels[message.author.id]}`
    );
  }

  // !random
  if (message.content === "!random") {
    const frases = [
      "🚀 El éxito empieza con disciplina.",
      "🔥 Hoy puede ser tu mejor día.",
      "🎯 Enfócate y conquista.",
      "🌌 El futuro es de los valientes."
    ];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    message.channel.send(frase);
  }

  // IA cuando mencionan al bot
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
              "Eres el asistente oficial de Club Studios. Responde de forma amigable, juvenil y profesional."
          },
          {
            role: "user",
            content: pregunta
          }
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
