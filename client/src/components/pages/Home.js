import React, { Component } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import { NewComment } from '../modules/InputComment.js';

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
      songs: ['spotify:track:6sQckd3Z8NPxVVKUnavY1F'],
      songId: 'spotify:track:6sQckd3Z8NPxVVKUnavY1F',
      songNotPlayed: false,
      comments: [],
      playing : false,
      topSong : null,
      spotifyPlayerName: '',
    };
  }

  componentDidMount() {
    get('/api/songs').then((songObjs) => {
        songObjs.map((songObj) => {
            this.setState({ songs: this.state.songs.concat([songObj]) });
        });
    });
    get('/')
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

  getProgressOfSong = () => {
    get('api/currentState').then((data) => {
        console.log('progress: ' + data.body.progress_ms + ' seconds');
    })
  }
  getTrack = () => {
    // will show currently playing track
    get('/api/currentTrack').then((data) => {
        this.setState({
            songId: data.body.item.uri
        })
        console.log('Song uri: ' + this.state.songId);
        if (this.state.songs.includes(this.state.songId) === false){
            this.setState({
                songNotPlayed: true
            });
        }
    });
  }
  
  addTrack = (songId) => {
    const body = { songId: songId}
    post('/api/song', body).then((song) => {
        this.setState({
            songs: [song.song_id].concat(this.state.songs),
            songNotPlayed: false
        })
        console.log(this.state.songs);
    });
  }

  // this gets called when the user pushes "Submit", so their
  // story gets added to the screen right away
  addNewSong = (songObj) => {
    this.setState({
      songs: [songObj].concat(this.state.songs),
    });
  };

  addNewComment = (comment) => {
      this.setState({
        comments: [comment].concat(this.state.comments),
      });
  };

  render() {
    console.log('am rerendering');
    console.log(this.state.comments)
    if (this.state.songNotPlayed){
        this.addTrack(this.state.songId);
    }
    let player = null;
    let newSong = null;
    if(this.state.playing) {
      player = <SpotifyPlayer 
      name={this.state.spotifyPlayerName}
      token={this.state.accessToken}
      uris={[this.state.songId]}
      callback={(state) => console.log(`Progress of the song: ${state.progressMs/1000} seconds`)}
    />
    }
    return (
      <>
        {/* <button onClick={this.handleLogin}>spotify login</button> */}
        {newSong}
        <button onClick={this.getPlaylists}>get playlists</button>
        <button onClick={this.playSong}> play song</button>
        <button onClick={this.getProgressOfSong}> get progess of song </button>
        <button onClick={this.getTrack}> get track </button>
        {player}
        <NewComment 
            songId = {this.state.songId} 
            addNewComment = {this.addNewComment}
        />
        {/* <div className="u-flex"></div>
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
        </div> */}
        
        {this.state.display ? <div>check your console log and explore the object there </div> : <div></div>}
      </>
    );
  }
}

export default Home;
