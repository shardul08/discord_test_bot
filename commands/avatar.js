module.exports = {
    name: 'avatar',
    description: 'View avatar of mentioned users',
    aliases: ['av','pfp','icon'],
    execute(message, args) {
        if(args[0]) {
            const avatarList = args.map(mention => {
                const user = getUserFromMentions(message,mention);
                if(user)
                    return `${user.username}'s avatar: ${user.displayAvatarURL({format:"png",dynamic:true})}`;
                })
            return message.channel.send(avatarList);
        }
        return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({format:"png",dynamic:true})}`);
    },
};

function getUserFromMentions(message,mention) {
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
    return message.client.users.cache.get(id);
}