/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");



const SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'user-read-recently-played', 'streaming', 'user-read-playback-state', 'user-modify-playback-state']

require('dotenv').config();

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URI,
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/spotifyLogin', (req, res) => {
  auth.spotifyLogin(req, res, spotifyApi)
})
router.get('/callback', async (req, res) => {
<<<<<<< HEAD
  const { code } = req.query;
  console.log(code)
  try {
    var data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:5000/home');
  } catch (err) {
    res.redirect('/#/error/invalid token');
  }
=======
  auth.callback(req, res, spotifyApi)
>>>>>>> 27f949e720daa4b51fe0512058b4335ec93c990f
});

// router.get('/spotifyLogin', (req, res) => {
//   console.log("called")
//   var html = spotifyApi.createAuthorizeURL(scopes)
//   console.log(html)
//   res.send({ url: html })
// })

// router.get('/callback', async (req, res) => {
//   const { code } = req.query;
//   console.log(code)
//   try {
//     var data = await spotifyApi.authorizationCodeGrant(code)
//     const { access_token, refresh_token } = data.body;
//     spotifyApi.setAccessToken(access_token);
//     spotifyApi.setRefreshToken(refresh_token);

//     res.redirect('http://localhost:5000/');
//   } catch (err) {
//     res.redirect('/#/error/invalid token');
//   }
// });
router.get('/token', async (req, res) => {
  try {
    const token = spotifyApi.getAccessToken();
    res.status(200).send({accessToken: token});
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get('/playlists', async (req, res) => {
  try {
    const result = await spotifyApi.getUserPlaylists();
    onsole.log(result.body);
    console.log(req.session.user)
    console.log(req.user)
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }

});
//am adding the following router.get('api/recentsong')



// router.post("/login", auth.login);

router.get('/getMe', (req, res) => {
  spotifyApi.getMe()
    .then(function (data) {
      console.log('Some information about the authenticated user', data.body);
      res.send(data)
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

router.post("/logout", (req, res) => { auth.logout(req, res, spotifyApi) });
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
