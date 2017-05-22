import {botClient, userClient} from './client'

export async function report(message: string) {
    let userToMessage = botClient.users.get(userClient.user.id)
    if (!userToMessage) {
        userToMessage = await botClient.fetchUser(userClient.user.id)
    }
    try {
        await userToMessage.send(message)
    } catch (e) {
        console.error('Unable to report message', message, e)
    }
    return
}