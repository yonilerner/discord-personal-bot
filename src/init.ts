import {config as dotenvConfig} from 'dotenv'
dotenvConfig()

import './config/globals'
import 'reflect-metadata'
import './db/typeorm_init'
import './db/knex_init'