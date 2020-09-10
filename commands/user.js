module.exports = {
    name: 'user',
    description: 'Get user information',
    execute(message, args) {
        message.channel.send(`**User Info**\nUsername: ${message.author.username}\nTag: ${message.author.tag}\nID: ${message.author.id}\nJoined: ${message.author.createdAt}\nAvatar: ${message.author.avatar}`);
    },
};