/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
// */

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
const { mongo } = require("mongoose");
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
router.get('/token', async (req, res) => {
  try {
    console.log('accessToken is here:' + req.user.accessToken );
    res.status(200).send({token:req.user.accessToken});
  } catch (err) {
    res.status(400).send(err);
  }
});
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

router.get('/songs', (req,res) => {
  Song.find({}).then((songs) => res.send(songs));
});
router.get('/sortedSongs', (req,res) => {
  Song.find({}).sort({count: 'desc'}).then((songs)=>res.send(songs));
})

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
    const songId = req.body.songId;
    const song = await Song.findOne({song_id: songId});
    const prevCount = song.count;
    await Song.updateOne({song_id: songId},{count: prevCount+1});
    // Song.findOne({song_id: songId}).then(())
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
    const loggedInSpotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_API_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.CALLBACK_URI,
    });
    loggedInSpotifyApi.setAccessToken(req.user.accessToken);
    const songId = req.body.songId;
    const track = await Song.findOne({song_id: songId});
    console.log(track);
    let song = null;
    if(track !== null){
      song = track;
      console.log('this track already exists.')
    }else{
      const newSong = new Song ({
        name: req.body.name,
        song_id: req.body.songId,
        count: 0,
      });
      song = await newSong.save();
      console.log('adding new song');
    }    
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

router.get("/colors", async (req, res) => {
  try{
    // Color.find({ songId: req.query.songId }).then((colors)=>res.status(200).send(colors))
    const colors = await Color.find({ songId: req.query.songId });
    console.log('colors in api/colors are: '+colors);
    // res.send(colors)
    
    res.status(200).send(colors);
  }catch(err){
    console.log("error caught in api/colors");
    res.status(400).send("error  caught in api colors");
    
  }
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;