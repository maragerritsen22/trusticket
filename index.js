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
        "Tickets"
        
]

    setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 12000) 

    

});


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


   


     var options = {

         active: active

     }

    

   

    var commands = bot.commands.get(command.slice(prefix.length));

    
    if (commands) commands.run(bot, message, args, options);

       



});
  
  bot.login(process.env.token);