const Discord = require('discord.js');
const file = new Discord.MessageAttachment('./hugo__bot-profile_image.png')
const {prefix} = require('../config.json');
const embed = require('./embed');
module.exports = {
    name: 'help',
    description: 'List all the commands or info about a particular command',
    aliases: ['commands'],
    usage: '[commmand name]',
    cooldown: 5,
    execute(message, args) {
        message.react('👍');
        const data = [];
        const {commands} = message.client;

        if(!args.length) {
            //data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => `\`${command.name}\``).join(' '));
            //data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            const helpEmbed = {
                color : 0x0099ff,
                title : 'TestBot8 help',
                description : 'These are the available commands for TestBot8',
                thumbnail : {
                    url : 'attachment://hugo__bot-profile_image.png',
                },
                fields : [
                    {
                        name : 'Bot Prefix',
                        value : `\`${prefix}\``,
                    },
                    {
                        name : 'For help related to a particular command',
                        value : `\`${prefix}help [command name]\``,
                    },
                    {
                        name : 'Commands',
                        value : data,
                    },
                ],
            };
            return message.author.send({files: [file], embed : helpEmbed})
                .then(() => {
                    if(message.channel.type == 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send DM to ${message.author.tag}.\n`,error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command)
            return message.reply('that\'s not a valid command!');
        
        //data.push(`**Name:** ${command.name}`);

        if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if(command.description) data.push(`**Description:** ${command.description}`);
        if(command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        // const helpEmbed = {
        //     title : 'TestBot8 help',
        //     description : command.description,
        // };
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('0x0099ff')
            .setTitle('TestBot8 help')
            .setDescription(`**${command.name}**: \n${command.description}`);
        if(command.aliases)
            helpEmbed.addField('Aliases', `\`${command.aliases}\``);
        
        if(command.usage)
            helpEmbed.addField('Usage', `\`${prefix}${command.name} ${command.usage}\``)
  
        message.channel.send(helpEmbed);
        
    },
};