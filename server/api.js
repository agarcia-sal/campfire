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
const Comment = require("./models/comment");
const Song = require("./models/song");
const Color = require("./models/color");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");
// const socketManager = require("./server-socket");



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
  auth.callback(req, res, spotifyApi)
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
// router.get('/token', async (req, res) => {
//   try {
//     const token = spotifyApi.getAccessToken();
//     res.status(200).send({accessToken: token});
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });
router.get('/playlists', async (req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setAccessToken(req.user.accessToken);
    const result = await loggedInSpotifyApi.getUserPlaylists();
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }
});


router.get('/currentState', async(req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setAccessToken(req.user.accessToken);
    const track = await loggedInSpotifyApi.getMyCurrentPlaybackState();
    // console.log(track.body);
    res.status(200).send(track);
  } catch(err) {
    res.status(400).send(err)
  }
});

// router.post("/song", auth.ensureLoggedIn, (req, res) => {
//   const newSong = new Song ({
//     song_id: req.body.songId,
//   });
//   newSong.save().then((song) => res.send(song));
// });

router.get('/songs', (req,res) => {
  Song.find({}).then((songs) => res.send(songs));
});

router.post("/comment", auth.ensureLoggedIn, async(req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setAccessToken(req.user.accessToken);
    const data = await loggedInSpotifyApi.getMyCurrentPlayingTrack();
    const newComment = new Comment ({
      songId: data.body.item.uri,
      progressMs: data.body.progress_ms,
      content: req.body.content,
      spotifyId: req.body.userId, 
    });
    // newComment.save().then((comment) => res.send(comment));
    await newComment.save();
    socket.getIo().emit("newComment", newComment );
  } catch (err){
    res.status(400).send(err)
  }
  
});

router.get("/comments", (req, res) => {
  Comment.find({ songId: req.query.songId }).then((comments) => {
    res.status(200).send(comments);
  });
});


// router.post("/login", auth.login);

router.get('/getMe', (req, res) => {
  const loggedInSpotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URI,
  });
  console.log(req.user)
  loggedInSpotifyApi.setAccessToken(req.user.accessToken);
  loggedInSpotifyApi.getMe()
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

router.get("/search", async (req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setAccessToken(req.user.accessToken);
    const songTitle = req.query.title;
    console.log(`song title is ${songTitle}`);
    const tracks = await loggedInSpotifyApi.searchTracks(`track:${songTitle}`, {limit:5});
    res.status(200).send(tracks); //use tracks.body to get titles?
  } catch (err) {
    res.status(400).send(err);
  }
})

// router.post("/api/comment", auth.ensureLoggedIn, (req, res) => {
//   const newComment = new Comment({
//     parent: req.body.parent, //song uri
//     content: req.body.content, 
//   });
// });
// router.post("/song", auth.ensureLoggedIn, (req, res) => {
//   const newSong = new Song ({
//     song_uri: req.body.songUri,
//   });
//   newSong.save().then((song) => res.send(song));
//   //called by addTrack so also need to pass back the token
// });
router.post("/song", auth.ensureLoggedIn, async (req, res) => {
  try {
    const newSong = new Song ({
      song_id: req.body.songId,
    });
    const song = await newSong.save();
    const token = req.user.accessToken;
    res.status(200).send({song: song, token: token})
  }
  catch(err) {
    res.status(400).send(err);
  }
  //called by addTrack so also need to pass back the token
});

router.post("/color", auth.ensureLoggedIn, async(req, res) => {
  try {
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setAccessToken(req.user.accessToken);
    const data = await loggedInSpotifyApi.getMyCurrentPlayingTrack();
    const newColor = new Color ({
      songId: data.body.item.uri,
      progressMs: data.body.progress_ms,
      color: req.body.color,
    });
    newColor.save().then((color) => res.send(color));
  } catch (err){
    res.status(400).send(err)
  }
  
});

router.get("/colors", (req, res) => {
  Color.find({ songId: req.query.songId }).then((colors) => {
    res.status(200).send(colors);
  });
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;