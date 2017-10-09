# easy-auth-api

## Summary
### Get token / basic profile on client side
It use [hello.js](https://adodson.com/hello.js/) for simplify get data on social network

### Check if profile is really exists on social network (via server side)
* [ ] https://github.com/joehua87/easy-auth-api/issues/2

### Store user to database if not exists
* Create new from profile data get from social network
* Check duplicated user via `profiles[network].profile.email`

### Return the jwt token

## Client side example for facebook auth
```js
await hello('facebook').login({
  scope: 'email',
})
const auth = hello.getAuthResponse('facebook')
const profile = await hello('facebook').api('me')
const payload = { auth, profile }
const response = await request({
  url: 'auth.example.com/auth',
  method: 'post',
  data: payload,
})
const { token } = response.data
window.localStorage.setItem('token', token)
```

## Credit
* https://ole.michelsen.dk/blog/social-signin-spa-jwt-server.html
