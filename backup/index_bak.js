const Discord = require('discord.js');
const {prefix,token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'ping')
        message.channel.send('Pong!');
    else if(command.startsWith('beep'))
        message.channel.send('boop!');
    else if(command == 'server')
        message.channel.send(`**Server Info**\nName: ${message.guild.name}\nID: ${message.guild.id}\nCreated: ${message.guild.createdAt}\nRegion: ${message.guild.region}\nMembers: ${message.guild.memberCount}\nOwner: ${message.guild.owner}`);
    else if(command == 'user')
        message.channel.send(`**User Info**\nUsername: ${message.author.username}\nTag: ${message.author.tag}\nID: ${message.author.id}\nJoined: ${message.author.createdAt}\nAvatar: ${message.author.avatar}`);
    else if(command == 'args')
        if(!args.length)
            message.channel.send(`You didn't provide any argument, ${message.author}`);
        else
            message.reply(`you provided ${args.length} arguments\n\`${args}\``);
    else if(command == 'reply')
        message.reply(`here is your reply`);
    else if(command == 'kick')
        if(!message.mentions.users.size)
            message.reply('you need to tag a member to kick them!');
        else
            message.channel.send(`Do you want to kick ${message.mentions.users.first().username}?`);
    else if(command == 'avatar') {
        /*
        if(!message.mentions.users.size)
            message.channel.send(`Your avatar: ${message.author.displayAvatarURL({format:"png",dynamic:true})}`);
        else {
            const avatarList = message.mentions.users.map(user => {
                return `${user.username}'s avatar: ${user.displayAvatarURL({format:"png",dynamic:true})}`;
            });
            message.channel.send(avatarList);
        }*/
        if(args[0]) {
            const avatarList = args.map(mention => {
                const user = getUserFromMentions(mention);
                if(user)
                    return `${user.username}'s avatar: ${user.displayAvatarURL({format:"png",dynamic:true})}`;
            })
            return message.channel.send(avatarList);
        }
        return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({format:"png",dynamic:true})}`);
    }
    else if(command == 'prune') {
        const amount = parseInt(args[0]) + 1;
        if(isNaN(amount))
            return message.channel.send('Provide a number');
        if(amount<=1 || amount>100)
            return message.channel.send('provide a number between 1 and 99');
        message.channel.bulkDelete(amount,true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel.');
        });
    }
});

function getUserFromMentions(mention) {
    if(!mention)
        return;
    /*
    if(mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2,-1);
        if(mention.startsWith('!'))
            mention = mention.slice(1);
        
        return client.users.cache.get(mention);
    }*/
    const matches = mention.match(/^<@!?(\d+)>$/);
    if(!matches)
        return;
    const id = matches[1];
    //console.log(matches);
    return client.users.cache.get(id);
}

client.login(token);