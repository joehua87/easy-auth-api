// @flow

import { Schema } from 'mongoose'
import mongoose from './mongoose'

export const schemaName = 'App'

export const schemaDefinition = {
  id: { type: String, required: true },
  name: { type: String, required: true },
  socialApp: {
    dropboxId: { type: String },
    facebookId: { type: String },
    githubId: { type: String },
    googleId: { type: String },
    instagramId: { type: String },
    microsoftId: { type: String },
    twitterId: { type: String },
  },
}

export const schema = new Schema(schemaDefinition, { collection: schemaName })

export const Model = mongoose.model(schemaName, schema)
