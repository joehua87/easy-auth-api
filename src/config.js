// @flow

require('dotenv').config()

export const appCode = 'easy-auth-api'
export const machine = process.env.MACHINE || 'default'

export const env = process.env.NODE_ENV || 'development'

export const mongoUri = env !== 'test' ? process.env.MONGO_URI : 'mongodb://localhost/easy-auth-test'

export const apiSecret = process.env.API_SECRET || 'my-secret'
export const enableAuth = process.env.API_ENABLE_AUTH !== 'false'
