const { Client, GatewayIntentBits , Partials  , ButtonBuilder ,ActionRowBuilder , ButtonStyle  , PermissionsBitField ,Collection , WebhookClient  , EmbedBuilder } = require('discord.js')
const ascii = require("ascii-table");
require('colors')

const fs = require('fs')

const client = new Client({
  intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates

  	],

  Partials: [
		Partials.Message,
		Partials.Reaction,
		Partials.User,
		Partials.Channel,
		Partials.GuildMember,
		Partials.ThreadMember,
		Partials.GuildScheduledEvent,
	],
	allowedMentions: { parse: ['users', 'roles' , 'everyone'], repliedUser: true }
});




module.exports = client

const PREFIX = "h"
const Tken = ""

client.on("ready", (bot) => {
    console.log(`Logged in as ${bot.user.tag}`)
  bot.user.setPresence({activity:{name: "Cặc ba m", type: "WATCHING"}, status: "STREAMING"})
});


let cooldowns = {};

client.on('messageCreate', async (message) => {
   if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const lenh = args.shift().toLowerCase();


  if(lenh === "customspam") {
    const massdmsrole = ["1226161375101849610" , "1142094846971097148"]
    const allowedGuildID = '1131617982754324610';

 /* if (!message.member.roles.cache.some(role => massdmsrole.includes(role.id))) {
    message.reply('You need boost sv to use command..');
    return;
  }*/

  const targetUser = message.mentions.users.first();
  if (!targetUser) {
    message.reply('Please mention a user.');
    return;
  }

  const ownerIDs = ["931571593765851136", "1150017078464610376"];
  if (message.mentions.users.some(user => ownerIDs.includes(user.id))) {
    message.reply('Do not ping the server owner.');
    return;
  }
    
const antirole = ["1142094846971097148", "1228685763680538735"];

if (message.mentions.members.first()) {
    const mentionedMember = message.mentions.members.first();
    if (mentionedMember.roles && mentionedMember.roles.cache) {
      if (mentionedMember.roles.cache.some(role => antirole.includes(role.id))) {
        message.reply('anti spam.');
        return;
      }
    }
  }
      
       
   const content = args.slice(1, -1).join(" ");
   if (!content) {
      message.reply('Please provide the content to be spammed.');
      return;
    }


const spamCount = parseInt(args[args.length - 1]);
if (isNaN(spamCount) || spamCount < 1 || spamCount > 50) {
message.reply('Please provide a valid number for the times to spam within the range of 1 to 50.');
return;
}
 
 const userId = message.author.id;
  const currentTime = Date.now();
  const cooldownPeriod = 5 * 60 * 1000; 

  if (cooldowns[userId] && currentTime - cooldowns[userId] < cooldownPeriod) {
    const timeLeft = cooldownPeriod - (currentTime - cooldowns[userId]);
    const minutesLeft = Math.floor(timeLeft / (60 * 1000));
    const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
      const timestamp = `<t:${parseInt(currentTime / 1000) + Math.floor(timeLeft / 1000)}:R>`;
     message.reply(`You have to wait ${timestamp}  before you can use this command.`);
    return;
  }

  cooldowns[userId] = currentTime;
      
  fs.readFile('./tokens.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading tokens file:', err);
      return;
    }
    const tokens = JSON.parse(data).tokens;

    tokens.forEach(token => {
      const bot = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.GuildVoiceStates
        ],

        partials: [
          Partials.Message,
          Partials.Reaction,
          Partials.User,
          Partials.Channel,
          Partials.GuildMember,
          Partials.ThreadMember,
          Partials.GuildScheduledEvent,
        ],
      });

      function sendCustomMessages(user, remaining) {
          if (remaining > 0) {
            user.send(content)
              .then(() => {
                  sendCustomMessages(user, remaining - 1); 
              })
              .catch(console.error);
          }
 
        }

      bot.on('ready', () => {
        bot.users.fetch(targetUser.id).then(user => {
          sendCustomMessages(user, spamCount); 
        }).catch(console.error);
      });

      bot.login(token);
    })
      
      
  });
       lastUsageTime = currentTime; 
      message.reply('MassDms Done');

}

 


    

})




process.on("unhandledRejection",(err) => {
  console.error(err)
});
process.on("uncaughtException",(er) => {
  console.error(er)
})

client.login(Tken)
