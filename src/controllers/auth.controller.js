// @flow

import { sign } from 'jsonwebtoken'
import { UserModel } from '../models'
import { appCode, apiSecret } from '../config'
import { getProfile } from '../processors/getProfile'

const debug = require('debug')(`${appCode}:controller:auth`)

export default async function socialAuth(ctx: any) {
  const { app, auth, profile: rawProfile } = ctx.request.body

  // debug('payload', ctx.request.body)

  const { network } = auth

  const profile = getProfile({
    network,
    profile: rawProfile,
  })

  debug('profile', profile)

  // If user is exists
  const user = await UserModel.Model.findOne({
    [`profiles.${network}.profile.email`]: profile.email,
    app,
  })

  if (user) {
    debug('Got User:', user)
    const token = sign({ username: user.name, scopes: user.scopes }, apiSecret)
    debug(token)
    ctx.status = 200
    ctx.body = { token }
    return
  }

  // If user is new
  const newUser = {
    ...profile,
    profiles: {
      [network]: { auth, profile },
    },
  }

  debug('new user', newUser)

  try {
    const createdUser = await UserModel.Model.create(newUser)
    const token = sign({ username: createdUser.name, scopes: createdUser.scopes }, apiSecret)
    debug(token)
    ctx.status = 200
    ctx.body = { token }
  } catch (err) {
    debug('create user error', err.message)
    // Do not expose the error
    ctx.throw(500, 'Error')
  }
}
