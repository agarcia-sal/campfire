import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import SpotifyPlayer from 'react-spotify-web-playback';

import "../../utilities.css";
import "./Skeleton.css";

import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      playing : false,
      topSong : null,
      spotifyPlayerName: '',
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  handleLogin = () => {
    get("/api/spotifyLogin").then((data) => {
      console.log((data))
      window.location.href = data.url
    })
  }

  getPlaylists = () => {
    get("/api/playlists").then((data) => {
      console.log(data);
      this.setState({ display: true });

    })
  }
  playSong = () => {
    get("/api/token").then((data) => {
      this.setState({accessToken : data.accessToken, playing : true})
    })
  }
  
  getMe = () => {
    get("/api/getMe").then((data) => {
      console.log(data.body)
    })
  }
  searchSongs = () => {
    get("/api/search", {title: 'love'}).then((data) => {
      console.log(data.body);
    })
  }



  render() {
    let player = null;
    if(this.state.playing) {
      player = <SpotifyPlayer 
      token={this.state.accessToken}
      uris={['spotify:track:6sQckd3Z8NPxVVKUnavY1F']}
      callback={(state) => this.setState({songState: state})}
    />
    }
    
    
    return (
      <>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
          )}
        <h1>Good luck on your project :)</h1>
        <h2> What we provide in this skeleton</h2>
        <ul>
          <li>Google Auth (Skeleton.js & auth.js)</li>
          <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
          <li>User Model (auth.js & user.js)</li>
        </ul>
        <h2> What you need to change</h2>
        <ul>
          <li>Change the font in utilities.css</li>
          <li>Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>Change the Server CLIENT_ID for Google Auth (auth.js)</li>
          <li>Change the Database SRV for Atlas (server.js)</li>
          <li>Change the Database Name for MongoDB (server.js)</li>
          <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
          <li>Update website title in client/dist/index.html</li>
        </ul>
        <button onClick={this.props.handleLogin}>spotify login</button>
        <button onClick={this.getPlaylists}>get playlists</button>
        <button onClick={this.getMe}>getMe</button>
        <button onClick={this.props.handleLogout}>logout</button>
        <button onClick={this.playSong}> play song</button>
        <button onClick={this.getProgress}> get progess of song </button>
        <button onClick={this.searchSongs}>look in console for search songs</button>
        {player}
        
        
        {this.state.display ? <div>check your console log and explore the object there </div> : <div></div>}
      </>
    );
  }
}

export default Skeleton;
