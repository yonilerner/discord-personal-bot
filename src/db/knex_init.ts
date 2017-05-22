import * as createKnex from 'knex'
import {globals} from '../config/globals'

export const knex = createKnex({
    client: 'mysql',
    connection: {
        host: globals.DB_HOST,
        user: globals.DB_USER,
        password: globals.DB_PASS,
        database: globals.DB_NAME
    }
})