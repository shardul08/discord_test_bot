module.exports = {
    name: 'args',
    description: 'Get the arguments you provided',
    args: true,
    usage : 'arg1,arg2,arg3..',
    execute(message, args) {
        if(!args.length)
            message.channel.send(`You didn't provide any argument, ${message.author}`);
        else
            message.reply(`you provided ${args.length} arguments\n\`${args}\``);
    },
};