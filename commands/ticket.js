const data = require('../tickets.json')
const config = require('../botconfig.json');
module.exports.run = async (bot, message, args) => {
    const discord = require('discord.js')
    const fs = require('fs')

    // ID van de categorie van de tickets.
    /*let categoryId = bot.channels.get(c => c.name == "test" && c.type == "category");*/



    // Verkrijg Gebruikersnaam
    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author.discriminator;

    // Als ticket al gemaakt is
    var bool = false;

    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

    // Kijk na als ticket al gemaakt is.
    // message.guild.channels.forEach((channel) => {

    //     // Als ticket is gemaakt, zend bericht.
    //     if (channel.name == `ticket-${userName}-${userDiscriminator}`) {

    //         message.channel.send("You have already created a ticket").then(m => m.delete(5000));

    //         bool = true;

    //     }

    // });
    // Als ticket return code.

if (!args[0]) {
            var embednoreason = new discord.RichEmbed()
            .setDescription(`**No reason**\n Hey <@${message.author.id}>, please specify a reason for your ticket`);
        message.channel.send(embednoreason).then(m => m.delete(5000));
            return;
        }
    // Maak kanaal en zet in juiste categorie.
    let categoryId = message.guild.channels.find(c => c.name === 'tickets');
    if (categoryId == null) {
        await message.guild.createChannel('tickets', {
            type: 'category',
            permissionOverwrites: [{
                id: message.guild.id,
                deny: ['READ_MESSAGES']
            }]
        })
            .then(t => categoryId = t)
        //.catch(console.error);
    }
    let roles = message.guild.roles.filter(x => x.hasPermission("KICK_MEMBERS"));
    let perms = []

    roles.forEach(role => {
        perms.push(
            {
                id: role.id,
                allow: ["READ_MESSAGES"]
            }
        )
    });
    perms.push(
        {
            id: message.guild.id,
            deny: ["READ_MESSAGES"]
        },
        {
            id: message.author.id,
            allow: ["READ_MESSAGES"]
        }
    )

    // message.guild.createChannel(`ticket-${userName}-${userDiscriminator} "text"`).then((createdChan) => {
    message.guild.createChannel(`ticket-${data.id}`, {
        type: 'text',
        setParent: categoryId,
        permissionOverwrites: perms

    })
        .then(createdChan => {
            // Maak kanaal

            createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.
                if (bool == true) return;
                var embedCreateTicket = new discord.RichEmbed()
                    .setAuthor(`Ticket from ${message.author.tag}`, message.author.displayAvatarURL)
                    .setDescription(`Your ticket (${settedParent}) has been created.\nPlease read the information sent and follow any instructions given.`)
                message.channel.send(embedCreateTicket).then(m => m.delete(5000));


                // Zet perms voor iedereen
                //settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
                // Zet perms voor de gebruiker die ticket heeft aangemaakt.
                // settedParent.overwritePermissions(message.author, {

                //     "READ_MESSAGES": true, "SEND_MESSAGES": true,
                //     "ATTACH_FILES": true, "CONNECT": true,
                //     "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true

                // });


                //todo: role met kick-member add in ticket


                var reason = args.join(" ").slice(0);
                settedParent.setTopic(`user: ${message.author} | Reason: ${reason} | server name: ${message.guild.name} | Ticket ID: ${data.id} | User ID: ${message.author.id}`);
                settedParent.send(`__**You have successfully created a ticket, ${message.author}**__`);
                var embedParent = new discord.RichEmbed()
                    .setDescription(`**Ticket topic:** \`${reason}\`\n\n${config.ticketText}`)
                    .setAuthor(`Ticket from ${message.author.tag}`)
                    .addField('Ticket:', ` ${message.author.tag}`)
                    .addField('Server:', ` ${message.guild.name}`)
                    .setThumbnail(message.author.displayAvatarURL)
                    .setColor(randomColor);

                settedParent.send(embedParent);


            }).catch(err => {
                message.channel.send("Something went wrong.");
            });

        }).catch(err => {
            message.channel.send("Something went wrong.");
        });
        data.id++;
        fs.writeFile('./tickets.json', '{\n"id":' + data.id + "\n}", (err) => {
            if (!err) return;
            console.error(err)
        })

        message.delete();


}

module.exports.help = {
    name: "new"
}