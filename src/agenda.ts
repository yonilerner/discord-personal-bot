import Agenda = require('agenda')
import {globals} from './config/globals'
import {report} from './discord/reporting'
import * as datejs from 'date.js'
import * as moment from 'moment'

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

export async function scheduleInLocalTime(message: string, name: string, data: any) {
    const nowInPacific = getCurrentPacificTime()
    const parsed = datejs(message, nowInPacific)
    await report(`Reminder scheduled. Message: '${message}'. Scheduled for ${parsed}`)
    const backToUtc = convertPacificToUtc(parsed)
    return agenda.schedule(backToUtc, name, data)
}

export function getPacificOffset() {
    return '-' + moment().tz('America/Los_Angeles').format().split('-').slice(-1)[0]
}

export function convertPacificToUtc(date: Date) {
    return new Date(
        moment(
            moment(date)
                .format()
                .replace('+00:00', getPacificOffset())
        )
            .tz('UTC')
            .format()
    )
}

export function getCurrentPacificTime() {
    return new Date(
        moment()
            .tz('America/Los_Angeles')
            .format()
            .split('-')
            .slice(0, -1)
            .join('-')
    )
}

export function cleanTimeMessage(msg: string) {
    msg = msg
        .replace(/\./g, '')
        .replace(/\s?([ap])\s+(m)\s/ig, '$1$2')
        .replace(/\s:\s/ig, ':')
    return msg
}
