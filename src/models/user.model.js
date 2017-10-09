// @flow

import { Schema } from 'mongoose'
import mongoose from './mongoose'

export const schemaName = 'User'

const socialSchema = new Schema({
  profile: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
  },
  auth: {
    state: { type: String },
    access_token: { type: String, required: true },
    expires_in: { type: Number },
    client_id: { type: String, required: true },
    network: { type: String, required: true },
    display: { type: String },
    redirect_uri: { type: String },
    scope: { type: String, required: true },
    expires: { type: Number },
  },
})

export const schemaDefinition = {
  username: { type: String },
  password: { type: String },
  email: { type: String, required: true },
  name: { type: String, required: true },
  avatar: {},
  app: { type: Schema.ObjectId, ref: 'App' },
  address: { type: String },
  phone: { type: String },
  profiles: {
    dropbox: socialSchema,
    facebook: socialSchema,
    github: socialSchema,
    google: socialSchema,
    instagram: socialSchema,
    microsoft: socialSchema,
    twitter: socialSchema,
  },
}

export const schema = new Schema(schemaDefinition, { collection: schemaName })

export const Model = mongoose.model(schemaName, schema)
