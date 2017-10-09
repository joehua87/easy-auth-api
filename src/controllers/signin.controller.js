// @flow

import md5 from 'md5'
import { sign } from 'jsonwebtoken'
import {
  UserModel,
} from '../models'
import { appCode, apiSecret } from '../config'

const debug = require('debug')(`${appCode}:controller:signin`)

export default async function signin(ctx: any) {
  const { username, password } = ctx.request.body
  if (!username) ctx.throw(400, 'Require username')
  if (!password) ctx.throw(400, 'Require password')

  const hashed = md5(password)

  const user = await UserModel.Model.findOne({
    username,
    password: hashed,
  }).lean()

  if (!user) {
    debug('Authentication fail')
    ctx.throw(401)
  }

  debug('Got User:', user)
  const token = sign({ username, scopes: user.scopes }, apiSecret)
  debug(token)
  ctx.status = 200
  ctx.body = { token }
}
