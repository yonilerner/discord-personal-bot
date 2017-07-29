import './init'

import * as express from 'express'
const app = express()

import {client} from './discord/client'

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(`Welcome to ${client.user.username}!`)
})

app.listen(process.env.NODE_PORT || 8080, data => {
    console.log('Listening...')
})