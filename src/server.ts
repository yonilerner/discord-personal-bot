import './init'
import * as express from 'express'
import {client} from './discord/client'
import {globals} from './config/globals'
import {agenda, DISCORD_NOTIFICATION_JOB, scheduleInLocalTime} from './agenda'
import {report} from './discord/reporting'
import bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`Welcome to ${client.user.username}!`)
})

app.post('/remind', async (req: express.Request, res: express.Response) => {
    const {message} = req.body
    try {
        console.log(`Reminder scheduled for '${message}'`)
        const response = await scheduleInLocalTime(message, DISCORD_NOTIFICATION_JOB, {
            message
        })
        console.log(`Reminder scheduled for ${message} done`)
        await report(`Reminder scheduled. Message: '${message}'. Response: ${JSON.stringify(response)}`)
        res.send({message, success: true, response})
    } catch (e) {
        console.error(`Error sending notification for '${message}'`, e)
        res.send({error: e.message})
    }
})

app.listen(globals.PORT, async () => {
    console.log(`Listening on ${globals.PORT}`)
    await agenda.start()
})