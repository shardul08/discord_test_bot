module.exports = {
    name: 'prune',
    description: 'delete messages',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;
        if(isNaN(amount))
            return message.channel.send('Provide a number');
        if(amount<=1 || amount>100)
            return message.channel.send('provide a number between 1 and 99');
        message.channel.bulkDelete(amount,true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel.');
        });
    },
};