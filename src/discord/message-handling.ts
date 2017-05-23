import {Message, TextChannel} from 'discord.js'
import {globals} from '../config/globals'
import {report} from './reporting'
import {userClient} from './client'

export async function handleUserMessage(message: Message) {
    if (
        message.channel instanceof TextChannel &&
        message.author.id !== userClient.user.id &&
        globals.highlightWords.some(regex => !!message.content.match(regex)) &&
        !globals.highlightExceptions.some(regex => !!message.content.match(regex))
    ) {
        await report(`You were mentioned by ${message.member}  in ${message.guild}:${message.channel}. Message was: ${message.content}`)
    }
}