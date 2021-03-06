import {client} from './client'
import {globals} from '../config/globals'

export async function report(message: string) {
    try {
        let userToMessage = client.users.get(globals.USER_ID)
        if (!userToMessage) {
            userToMessage = await client.fetchUser(globals.USER_ID)
        }
        await userToMessage.send(message)
    } catch (e) {
        console.error('Unable to report message', message, e)
    }
    return
}