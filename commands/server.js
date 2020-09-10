module.exports = {
    name: 'server',
    description: 'Get server information',
    guildOnly: true,
    execute(message, args) {
        message.channel.send(`**Server Info**\nName: ${message.guild.name}\nID: ${message.guild.id}\nCreated: ${message.guild.createdAt}\nRegion: ${message.guild.region}\nMembers: ${message.guild.memberCount}\nOwner: ${message.guild.owner}`);
    },
};