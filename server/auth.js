const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socket = require("./server-socket");

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user, accessToken) {
  // the "sub" field means "subject", which is a unique identifier for each user
  console.log("user's id is " + user.id)
  return User.findOne({ spotifyId: user.id }).then((existingUser) => {
    if (existingUser) {
      existingUser.accessToken = accessToken;
      return existingUser.save();
    }
    const newUser = new User({
      name: user.display_name,
      spotifyId: user.id,
      accessToken: accessToken,
    });

    return newUser.save();
  });
}
const spotifyLogin = (req, res, spotifyApi) => {
  var html = spotifyApi.createAuthorizeURL(scopes)
  console.log(html)
  res.send({ url: html })
}

const callback = async (req, res, spotifyApi) => {
  const { code } = req.query;
  console.log(code)
  try {
    const data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token: accessToken, refresh_token: refreshToken } = data.body;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi.getMe()
      .then((user) => {
        console.log('Some information about the authenticated user', user.body);
        return getOrCreateUser(user.body, accessToken)
      }, (err) => {
        console.log('Something went wrong!', err);
      }).then((user) => {
        req.session.user = user;
        res.redirect('http://localhost:5000/home');
        // res.redirect('https://cmpfire.herokuapp.com')
      }).catch((err) => {
        console.log(`Failed to log in: ${err}`);
        res.status(401).send({ err });
      });
  } catch (err) {
    res.redirect('/#/error/invalid token');
  }
}

function logout(req, res, spotifyApi) {
  req.session.user = null;
  spotifyApi.resetAccessToken();
  spotifyApi.resetRefreshToken();
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  logout,
  spotifyLogin,
  callback,
  populateCurrentUser,
  ensureLoggedIn,
};