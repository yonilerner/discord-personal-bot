import './init'
import * as express from 'express'
import {client} from './discord/client'
import {globals} from './config/globals'
import {agenda, DISCORD_NOTIFICATION_JOB} from './agenda'
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
        const response = await agenda.schedule(message, DISCORD_NOTIFICATION_JOB, {
            message
        })
        console.log(`Reminder scheduled for ${message} done`)
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