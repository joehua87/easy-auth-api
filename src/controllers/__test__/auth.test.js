/* eslint-disable import/prefer-default-export */

// @flow

import request from 'axios'
import { expect } from 'chai'
import { UserModel } from '../../models'
import { setUpAndTearDown } from '../../config-test'
import app from '../../app'
import googlePayload from './test-data/google-payload.json'
import facebookPayload from './test-data/facebook-payload.json'

function testAuth({ name, network, payload }: { name: string, network: string, payload: any }) {
  describe(name, () => {
    setUpAndTearDown()
    let server
    before(() => {
      server = app.listen(3333)
    })

    after(() => server.close())

    let response
    it('login', async () => {
      response = await request({
        url: 'http://localhost:3333/auth',
        method: 'post',
        data: payload,
      })
    })

    it('return jwt token', () => {
      expect(response.data.token).to.be.a('string')
    })

    it('create user in database', async () => {
      const user = await UserModel.Model.findOne({ email: payload.profile.email }).lean()
      expect(user.profiles[network].profile.email).to.equal(payload.profile.email)
    })

    it('login with exists user', async () => {
      response = await request({
        url: 'http://localhost:3333/auth',
        method: 'post',
        data: payload,
      })
    })

    it('return jwt token', () => {
      expect(response.data.token).to.be.a('string')
    })

    it('not create user', async () => {
      const users = await UserModel.Model.find().lean()
      expect(users.length).to.equal(1)
    })
  })
}

testAuth({
  name: 'Google Auth',
  network: 'google',
  payload: googlePayload,
})

testAuth({
  name: 'Facebook Auth',
  network: 'facebook',
  payload: facebookPayload,
})
