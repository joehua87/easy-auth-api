# easy-auth-api

## Summary
### Get token / basic profile on client side
It use [hello.js](https://adodson.com/hello.js/) for simplify get data on social network

### Check if profile is really exists on social network (via server side)
* [ ] #2

### Store user to database
* If the user is not exists -> create new (from profile data get from social network) -> return token
* If the user is exists -> return token

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
