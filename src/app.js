// @flow

import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import koaCors from 'koa-cors'
import convert from 'koa-convert'
// import jwt from 'koa-jwt'
// import {
//   apiSecret,
// } from './config'
import signin from './controllers/signin.controller'
import auth from './controllers/auth.controller'

const app = new Koa()
const router = new KoaRouter()

// app.use(jwt({ secret: apiSecret, passthrough: true }).unless({ path: '/login' }))

router.post('/signin', signin)
router.post('/auth', auth)

app.use(convert(koaCors()))
app.use(koaBody())

app.use(router.routes())
app.use(router.allowedMethods())

// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

export default app
