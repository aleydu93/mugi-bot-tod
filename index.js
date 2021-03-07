const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "§";

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "803221949353558028").send(member.displayName + " a rejoins la M.W ! <a:4165_Hyped_ZeroTwo:813436230934986783> ");
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre nous a quitté");
    member.guild.channels.cache.find(channel => channel.id === "814142954218192936").send(member.displayName + " est parti(e), reviens nous voir ! <:CAG_5_StellaCry:812642341802082305> ");
})

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès")
                }
                else{
                    message.reply("Impossible de bannir ce membre.")
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès.");
                }
                else {
                   message.reply("impossible de kick ce membre.") 
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
           let mention = message.mentions.members.first();
           
           if(mention == undefined){
               message.reply("Membre non ou mal mentionné.");
           }
           else {
               mention.roles.add("815597788082995280");
               message.channel.send(mention.displayName + " mute avec succès.");
           }
        }
        else if(message.content.startsWith(prefix + "unmute")){
           let mention = message.mentions.members.first();
           
           if(mention == undefined){
               message.reply("Membre non ou mal mentionné.");
           }
           else {
               mention.roles.remove("815597788082995280");
               message.channel.send(mention.displayName + " unmute avec succès.");
           }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("815597788082995280");
                setTimeout(function() {
                    mention.roles.remove("815597788082995280");
                    message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau !");
                }, args[2] * 1000);
            }
        }
    }

    //§ping
    if(message.content == prefix + "ping"){
        message.channel.send("pong")
    }

    if(message.content == prefix + "stat"){
        message.channel.send(message.author.username + " qui a pour identifiant : __"+ message.author.id + "__ a posté un message");
    }
});


Client.login(process.env.TOKEN);