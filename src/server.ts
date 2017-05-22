import './init'

import * as express from 'express'
const app = express()

import {botClient} from './discord/client'
import {scheduleRocketLeagueMessage} from './discord/misc'

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`Welcome to ${botClient.user.username}!`)
})

scheduleRocketLeagueMessage()

app.listen(8080, data => {
    console.log('Listening at 8080')
})