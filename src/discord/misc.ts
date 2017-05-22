import {userClient} from './client'
import {globals} from '../config/globals'
import * as later from 'later'

export async function sendRocketLeagueMessage() {
    let userToMessage = userClient.users.get(globals.ROCKET_LEAGUE_ID_TO_MESSAGE)
    if (!userToMessage) {
        userToMessage = await userClient.fetchUser(globals.ROCKET_LEAGUE_ID_TO_MESSAGE)
    }
    await userToMessage.send('Time to play Rocket League!')
}

export function scheduleRocketLeagueMessage() {
    if (!globals.ROCKET_LEAGUE_ID_TO_MESSAGE) {
        return
    }

    later.date.localTime()

    const schedule = later
        .parse
        .text('at 10:24 pm except on Friday')

    later.setInterval(sendRocketLeagueMessage, schedule)
}