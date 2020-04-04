const discord = require("discord.js");
const botConfig = require("./botconfig.json");










const fs = require("fs");         
const bot = new discord.Client();
bot.commands = new discord.Collection(); 

const active = new Map();

//const afk = require("./afk.json");

fs.readdir("./commands/" , (err, files) => { 

    if(err) console.log(err);  

    var jsFiles = files.filter(f => f.split(".").pop() === "js"); 

    if(jsFiles.length <=0) {
        console.log("Could not find any files"); 
        return;
    }

    jsFiles.forEach((f, i) => {   

        var fileGet = require(`./commands/${f}`);  
        console.log(`The file ${f} is loaded`); 

        bot.commands.set(fileGet.help.name, fileGet);
    })

});

//start of message logging (message edit)


    

 



bot.on("ready", async () => {

    console.log(`${bot.user.tag} is online!`)
    // bot.user.setActivity("?help", { type: "PLAYING" });
  
    let statuses = [
        ">help",
        ` ${bot.users.size} users`,
        ` ${bot.guilds.size} servers`,
        "http://tiny.cc/InfinityWebsite",
        ">setup to get started"
        
  ]
  
    setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});
  
    }, 12000) 
  
    
  
  });


//start of message logging (message edit)




    

 
bot.on("messageUpdate", async(oldMessage, newMessage, message ) => {
    if(oldMessage.content === newMessage.content){
        return;
    }

   

     var logEmbed = new discord.RichEmbed()
     .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
     .setThumbnail(oldMessage.author.avatarURL)
     .setColor("#2189eb")
     .setDescription("**Message Edited** ") 
     .addField("Before", oldMessage.content, true)
     .addField("After", newMessage.content, true)
     .setTimestamp();

     

     var logChannel = newMessage.guild.channels.find(ch => ch.name === "logs")
     if(!logChannel) return;

     logChannel.send(logEmbed);


 })



//end of message logging (message edit)

//start of message logging (message delete)

bot.on("messageDelete", async message => {

 var loggingEmbed = new discord.RichEmbed()
 .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
 .setTitle("**Message Deleted**")
 .setColor("#ff1100")
 .setThumbnail(message.author.avatarURL)
 .addField("Message From:", message.author.tag)
 .addField("Message Deleted:", message.content || "Message Deleted by the bot or could not be loaded.")
 .addField("Deleted In:", message.channel)
 .addField("Deleted At:", message.createdAt);
// .setFooter("User ID:", message.author.id);

 var logChannel = message.guild.channels.find(ch => ch.name === "logs")
 if(!logChannel) return;

 logChannel.send(loggingEmbed);



})


//end of message logging (message delete)






// bot.on("guildMemberAdd", member => {

//     var role = member.guild.roles.find("name", "Non-Member");

//     if(!role) return;

//     member.addRole(role);

//     const channel = member.guild.channels.find("name", "new-people");

//     if (!channel) return;

//     channel.send(`Welcome in the server ${member}`);
// });

bot.on("guildMemberAdd",   member => {

 
 var joinMessage = new discord.RichEmbed()
 .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
 .setDescription(`Hi ${member.user.tag}, **welcome!**`)
 .setColor("#00FF00")
 .setTimestamp()
 .setFooter("User joined");


const channel = member.guild.channels.find(`name`, "new-people");
  if (!channel) return;

 channel.send(joinMessage);

});

bot.on("guildMemberAdd", async (member, message) => {

 


 var joinMessageLog = new discord.RichEmbed()
 .setAuthor(`${member.guild.name} Modlogs`, member.guild.iconURL)
 .setTitle("Member Joined")
 .setDescription(`${member} joined the server, ${member.user.tag}`)
 .setThumbnail(member.displayAvatarURL)
 .setTimestamp()
 .setFooter(`ID: ${member.id}`);


     const channel = member.guild.channels.find(`name`, "logs");
     if (!channel) return;

 channel.send(joinMessageLog);
});


bot.on("guildMemberRemove",  member => {


 var leaveMessage = new discord.RichEmbed()
 .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
 .setDescription(`Thank you for being in our group! Good luck and have fun where ever your going! Bye, ${member}!`)
 .setColor("#FF0000")
 .setTimestamp()
 .setFooter("User left");

const channel = member.guild.channels.find("name", "new-people");
  if (!channel) return;


 channel.send(leaveMessage);


});

bot.on("guildMemberRemove", async (member, message) => {

 


 var leavMessageLog = new discord.RichEmbed()
 .setAuthor(`${member.guild.name} Modlogs`, member.guild.iconURL)
 .setTitle("Member Left")
 .setDescription(`${member} left the server, ${member.user.tag}`)
 .setTimestamp()
 .setFooter(`ID: ${member.id}`);


     const channel = member.guild.channels.find(`name`, "logs");
     if (!channel) return;

 channel.send(leavMessageLog);
});


// var swearWords = ["cancer", "fuck", "shit", "fucking", "bitch", "noob", "nub", "dumb", "stupid", "asshole", "asslicker", "assfucker", "assnigger", "nigger"];

bot.on("message", async message =>  {

 var prefix = botConfig.prefix;

if (!message.content.startsWith(prefix)) return;

 //Als bot bericht stuurt stuur dan return

 
 
 if (message.author.bot) return;

 if (message.channel.type === "dm") return;



 var messageArray = message.content.split(" ");

 var command = messageArray[0];

 var args = messageArray.slice(1);
 (!message.content.startsWith(prefix)); 


 if(cooldown.has(message.author.id)){
   message.delete();
  return message.reply("You have to wait 5 seconds between commands!").then(msg => {msg.delete(5000)});
   if(err => console.log(err)); 
 };

// if(!message.member.hasPermission("ADMINISTRATOR")){
   cooldown.add(message.author.id);
// }



  var options = {

      active: active

  }

  // Level system (begin)

var xpAdd = Math.floor(Math.random() * 7) + 8;
console.log(xpAdd);

if(!xp[message.author.id]){
 xp[message.author.id] = {
   xp: 0,
   level: 1
 };
}
var curxp = xp[message.author.id].xp;
var curlevel = xp[message.author.id].level;
var nextlevl = xp[message.author.id].level * 300;
xp[message.author.id].xp = curxp + xpAdd;
if(nextlevl <= xp[message.author.id].xp) {
      xp[message.author.id].level = curlevel + 1;
    

var lvlup = new discord.RichEmbed()
.setTitle("Level Up!")
.setColor("#34ebe5")
.addField("New Level", curlevel + 1)
.setFooter(`${message.author.tag} just leveled up!`);
 
 message.channel.send(lvlup).then(msg => msg.delete(7000));
}


  fs.writeFile("./levels.json", JSON.stringify(xp), (err) => {
     if(err) console.log(err)
   });

// Level system (end)

//coin system (begin)
if(!coins[message.author.id]){
 coins[message.author.id] = {
   coins: 0
 };
}

var coinAmt = Math.floor(Math.random() * 15) + 1;
var baseAmt = Math.floor(Math.random() * 15) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);

if(coinAmt === baseAmt){
 coins[message.author.id] = {
   coins: coins[message.author.id].coins + coinAmt
 };
 fs.writeFile("./coins.json", JSON.stringify(coins, null, 4), (err) => {
   if (err) console.log(err)
 });
 
 var coinembed = new discord.RichEmbed()
 .setAuthor(message.author.tag)
 .setColor("#6bfc03")
 .addField("💸", `${coinAmt} coins added!`);
 
 message.channel.send(coinembed).then(msg => msg.delete(5000));
}

//coin system (end)

 if(!command) {

     var swearWords = JSON.parse(fs.readFileSync("./swearWords.json"));

     var sentenceUser = "";

     var amountSwearWords = 0;

     for(var y = 0; y < messageArray.length; y++) {

         var changeWord = "";

         for(var i = 0; i < swearWords["swearWords"].length; i++) {

             var word = messageArray[y].toLowerCase();

             if(word == swearWords["swearWords"][i]) {

                 changeWord = word.replace(swearWords["swearWords"][i], "****");

                 sentenceUser = sentenceUser + " " + changeWord;

                 amountSwearWords++;

             }

         }

         if(!changeWord){

             sentenceUser = sentenceUser + " " + messageArray[y];              


         }

     }

     if(amountSwearWords != 0){

         message.delete();
         message.channel.send(sentenceUser);
         message.channel.send(message.author + " Don't swear! It may lead to a mute! Thank you!") && message.delete(1000);

     }

 }



 var commands = bot.commands.get(command.slice(prefix.length));

 
 if (commands) commands.run(bot, message, args, options);

    



setTimeout(() => {
cooldown.delete(message.author.id)
}, cdseconds * 1000)

});

bot.login(process.env.token);