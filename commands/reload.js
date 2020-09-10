module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) 
            || message.client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        
        if(!command)
            return message.channel.send(`there is no command with the name or alias \`${commandName}\`, ${message.author}!`);
        
        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name,newCommand);
        } catch(error) {
            console.log(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }

        message.channel.send(`Command \`${command.name}\` was reloaded!`);
    },
};