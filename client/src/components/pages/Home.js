import React, { Component } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import NavBar from "../modules/NavBar";
import "../../utilities.css";
import "./Home.css";

import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      songId: 'spotify:track:6sQckd3Z8NPxVVKUnavY1F',
      comments: [],
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
//   getProgress = () => {
//     //will change state of something to re-render so i can get the new state
//     // this.setState({spotifyPlayerName : 'Spotify Web Player'});
//     this.setState({changeState: true});
//     console.log(`Progress of the song: ${this.state.songState.progressMs/1000} seconds`);
//     this.setState({spotifyPlayerName: ''});
//   }

  getProgress = () => {
    get('api/currentState').then((data) => {
        console.log('progress: ' + data.body.progress_ms + ' seconds');
    })
  }
  getTrack = () => {
    // will show currently playing track
    get('/api/currentTrack').then((data) => {
        console.log('Song uri: ' + data.body.item.uri);
    })
  }

  searchSongs = () => {
    get("/api/search", {title: 'love'}).then((data) => {
      console.log(data.body); //data.body.tracks.items.#.name|id| or data.body.tracks.items.#.album.images.#.url
    })
  }


  render() {
    console.log('am rerendering');
    let player = null;
    if(this.state.playing) {
      player = <SpotifyPlayer 
      name={this.state.spotifyPlayerName}
      token={this.state.accessToken}
      uris={['spotify:track:6sQckd3Z8NPxVVKUnavY1F']}
      callback={(state) => console.log(`Progress of the song: ${state.progressMs/1000} seconds`)}
    />
    }
    
    return (
      <>
        <NavBar />
        {/* <button onClick={this.handleLogin}>spotify login</button> */}
        <button onClick={this.getPlaylists}>get playlists</button>
        <button onClick={this.playSong}> play song</button>
        <button onClick={this.getProgress}> get progess of song </button>
        <button onClick={this.getTrack}> get track </button>
        <button onClick={this.searchSongs}> look in console for searched songs</button>
        {player}
        <div className="u-flex">
        <input
          type="text"
          placeholder="comment something!"
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          // className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
        </div>
        
        {this.state.display ? <div>check your console log and explore the object there </div> : <div></div>}
      </>
    );
  }
}

export default Home;
