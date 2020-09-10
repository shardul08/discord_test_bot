module.exports = {
    name: 'kick',
    description: 'kick a user',
    guildOnly:true,
    args:true,
    usage: '<user>',
    execute(message, args) {
        if(!message.mentions.users.size)
            message.reply('you need to tag a member to kick them!');
        else
            message.channel.send(`Do you want to kick ${message.mentions.users.first().username}?`);
    },
};