import {Client, Message, GuildMember} from 'discord.js'
import {globals} from '../config/globals'
import {} from './commands'
import {report} from './reporting'
import {handleUserMessage} from './message-handling'

const botClient = new Client()
const userClient = new Client()

const clients = [
    userClient,
    botClient
]

clients.forEach(client => {
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user.username}!`)
    })

    client.on('message', async (message: Message) => {
        if (message.author.id === client.user.id) {
            return
        }
        try {
            await handleUserMessage(message)
        } catch (e) {
            console.error('Error handling message', e, message)
        }
    })

    client.on('debug', (info) => {
        if (globals.isDev) {
            console.log(info)
        }
    })
})

const login = async () => {
    await userClient.login(globals.USER_TOKEN)
    await botClient.login(globals.BOT_TOKEN)

    await report('Logged in!')
}
login()

export {
    botClient,
    userClient,
    clients
}