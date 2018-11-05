import Agenda = require('agenda')
import {globals} from './config/globals'
import {report} from './discord/reporting'

export const agenda = new Agenda({
    db: {
        address: globals.MONGO_URL,
        options: {
            useNewUrlParser: true
        }
    }
})

export const DISCORD_NOTIFICATION_JOB = 'DISCORD_NOTIFICATION'
agenda.define(DISCORD_NOTIFICATION_JOB, async (job, done) => {
    const log = `Job ${DISCORD_NOTIFICATION_JOB} called with ${JSON.stringify(job.attrs.data)}`
    console.log(log)
    try {
        await report(`Notification: ${job.attrs.data.message}`)
        console.log(log + ' done')
    } catch (e) {
        console.error(`Error with '${log}'`, e)
    }
    done()
})
