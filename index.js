const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(` app listening at http://localhost:${port}`));





const Discord = require('discord.js');
const client = new Discord.Client();
const emoji = require('./Emojis')
const modlogchannel = '754024869921816576';
const adminlogchannel = '754024839429488680';

client.on('ready', async () => {
    client.user.setActivity('dm to apply | prefix = !');
    console.log('Handling applications now');
});

const prefix = '!';

client.on('message', async message => {
    if (!message.content.startsWith(prefix)) return;    
    const modembed = new Discord.MessageEmbed();
    modembed.setTimestamp()
    modembed.setDescription("Moderator Application from: " + message.author.tag)

    if (message.content === prefix + 'help') {
        const helpembed = new Discord.MessageEmbed()
        .setDescription('I am bot that allows people like you to apply to get roles like mod admin ext. Just note. It is not a gurantee that u can your desired role. to apply simply dm me !apply and follow the instructions. Have a good day!')
        .setTimestamp()
        .addField('Oh and could you rate me. It could really help improve me', 'Thanks for applying!')
        .setFooter('Developed by jacob perry from: Pixel Development')
        message.channel.send(helpembed).then(sentMessage => {
            sentMessage.react('👍')
            sentMessage.react('👎')
        })
    }

    if (message.content === prefix + 'ping') {
      message.reply('Calcualting ping...').then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp

        resultMessage.edit(`Bot latency: \`\`${ping}\`\`, API Latency: \`\`${client.ws.ping}\`\``)
      })
    }

    if (message.content === prefix + 'apply') {
       
            if (message.channel.type !== 'dm') return message.reply('This command can only be run in dms')
        let app = new Discord.MessageEmbed()
        .setDescription(`${emoji[1]} Mod application\n${emoji[2]} Admin Application\n\n Please type the number for the application`)
        message.channel.send(app).then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time'] })
		.then(messages => {
            //${messages.first().content}
			if (messages.first().content === '1') message.channel.send('Why would you like to become a moderator').then(() => {
                message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time'] })
                .then(messages => {
                    modembed.addField('Question 1\nWhy would you like to become a moderator\n Answer: ',  messages.first().content)
            }).then(() => {
                message.channel.send('Have you had any experience modding any other servers? If so How was the experience?').then(() => {
                    message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time']})
                    .then(messages => {
                        modembed.addField('Question 2\nHave you had any experience moderating any other servers? If so How was the experience?\n Answer: ', messages.first().content)
                        message.channel.send(modembed).then(() => {
                            message.channel.send('Are you okay with the current application yes/no').then(() =>{
                                message.channel.awaitMessages(filter, { time: 6000, max: 1, errors: ['time']})
                                .then(messages => {
                                    if (messages.first().content === 'no' || messages.first().content === 'n'|| messages.first().content === 'No' || messages.first().content === 'N') return message.channel.send('Okay canceled')
                                    if (messages.first().content === 'yes' || messages.first().content === 'y'|| messages.first().content === 'Yes' || messages.first().content === 'Y') return message.channel.send('Okay application sent').then(() => {
                                        client.channels.cache.get(modlogchannel).send(modembed)
                                    })
                                })
                            })
                        })
                    })
                })
            })
		})
		.catch(() => {
			return message.channel.send('You did not enter any input!');
        });

        if (messages.first().content === '2') {
            const adminembed = new Discord.MessageEmbed();
            adminembed.setTimestamp();
            adminembed.setDescription("Admin Application from: " + message.author.tag)
            message.channel.send('Why would you like to become a Admin').then(() => {
                message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time'] })
                .then(messages => {
                    adminembed.addField('Question 1\nWhy would you like to become a Admin\n Answer: ',  messages.first().content)
            }).then(() => {
                message.channel.send('Have you had any experience being an admin any other servers? If so How was the experience?').then(() => {
                    message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time']})
                    .then(messages => {
                        adminembed.addField('Question 2\nHave you had any experience being an admin any other servers? If so How was the experience?\n Answer: ', messages.first().content)
                        message.channel.send(adminembed).then(() => {
                            message.channel.send('Are you okay with the current application yes/no').then(() =>{
                                message.channel.awaitMessages(filter, { time: 6000, max: 1, errors: ['time']})
                                .then(messages => {
                                    if (messages.first().content === 'no' || messages.first().content === 'n'|| messages.first().content === 'No' || messages.first().content === 'N') return message.channel.send('Okay canceled')
                                    if (messages.first().content === 'yes' || messages.first().content === 'y'|| messages.first().content === 'Yes' || messages.first().content === 'Y') return message.channel.send('Okay application sent').then(() => {
                                        client.channels.cache.get(logchannel).send(adminembed)
                                    })
                                })
                            })
                        })
                    })
                })
            })
		})
		.catch(() => {
			return message.channel.send('You did not enter any input!');
        });
        }
        
    })
           
        })    
           
    }
});


client.login(process.env.TOKEN);