import {Client, Message} from 'discord.js'
import {globals} from '../config/globals'
import {report} from './reporting'
import {handleUserMessage} from './message-handling'

export const client = new Client()

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', async (message: Message) => {
    if (message.author.id === client.user.id || message.author.id === globals.USER_ID) {
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

const login = async () => {
    await client.login(globals.BOT_TOKEN!)

    await report('Logged in!')
}
login()
