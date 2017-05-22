import {Connection, createConnection, DriverOptions} from 'typeorm'
import {globals} from '../config/globals'
import {Logger} from 'typeorm/logger/Logger'
import {MysqlDriver} from 'typeorm/driver/mysql/MysqlDriver'
import * as path from 'path'

const driver: DriverOptions = {
    type: 'mysql',
    host: globals.DB_HOST,
    port: 3306,
    username: globals.DB_USER,
    password: globals.DB_PASS,
    database: globals.DB_NAME
}

const fakeLogger = new Logger({})
const fakeDriver = new MysqlDriver(driver, fakeLogger)

let connection = new Connection('test', fakeDriver, fakeLogger)

createConnection({
    driver,
    entities: [
        path.join(__dirname, 'entities', '*.js')
    ],
    autoSchemaSync: true
})
    .then((createdConnection: Connection) => {
        if (!createdConnection) {
            throw new Error('Unable to make a DB connection!')
        }
        connection = createdConnection
    })

export {
    connection
}