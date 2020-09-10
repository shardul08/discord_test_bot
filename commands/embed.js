const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Get embeded message',
    execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some Title')
            .attachFiles('./hugo__bot-profile_image.png')
            .setURL('https://www.google.com')
            .setAuthor('Shardul','attachment://hugo__bot-profile_image.png')
            .setDescription('Some description here')
            .setThumbnail('attachment://hugo__bot-profile_image.png')
            .addFields(
                {name: 'Regular field title', value: 'Some value here'},
                {name: '\u200B', value: '\u200B'},
                {name: 'Inline field title', value: 'Some value here', inline: true},
                {name: 'Inline field title', value: 'Some value here', inline: true},
            )
            .addField('Inline field title', 'Some value here',true)
            .setImage('attachment://hugo__bot-profile_image.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'attachment://hugo__bot-profile_image.png');

        message.channel.send(exampleEmbed);
    },
};