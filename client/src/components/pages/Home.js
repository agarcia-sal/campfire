import React, { Component } from "react";
import { Redirect } from "@reach/router";
import SpotifyPlayer from 'react-spotify-web-playback';
import NavBar from "../modules/NavBar";
import CommentsBlock from "../modules/CommentBlock.js";
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
      userId: undefined,
      songs: ['spotify:track:6sQckd3Z8NPxVVKUnavY1F'],
      // songId: 'spotify:track:6sQckd3Z8NPxVVKUnavY1F',
      songId : '',
      songNotPlayed: false,
      playing : false,
      spotifyPlayerName: '',
    };
  }
  

  componentDidMount() {
    get('/api/songs').then((songObjs) => {
        songObjs.map((songObj) => {
            this.setState({ songs: this.state.songs.concat([songObj]) });
        });
    });

    get('/api/getMe').then((user) => {
      console.log(user)
      this.setState({
          userId: user.body.id
      }); 
    })
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
    get('api/currentTrack').then((data) => {
        console.log('progress: ' + data.body.progress_ms + ' seconds');
    })
  }
  getTrack = () => {
    // will show currently playing track
    get('/api/currentTrack').then((data) => {
        this.setState({
            songId: data.body.item.uri
        })
        console.log(data.body)
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
    post('/api/song', body).then((data) => {
        this.setState({
            songs: [data.song.song_id].concat(this.state.songs),
            songNotPlayed: false, 
            playing : true,
            songId : songId,
            accessToken: data.token,
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

  searchSongs = () => {
    get("/api/search", {title:'love'}).then((data) => {
      console.log(data.body);
    });
  }
  checkSongState = (state) => {
    console.log('state: ');
    console.log(state);
    if (state.track.uri !== this.state.song_id && state.track.uri !== ''){
      this.setState({songId : state.track.uri});
    }

  }
  
  render() {
    
    console.log(this.props.userId)
    if (this.props.userId === undefined) {
      console.log('redirecting');
      return (<Redirect to="/" />);
    }
    console.log('am rerendering');
    if (this.state.songNotPlayed){
        this.addTrack(this.state.songId);
    }
    let player = null;
    let newSong = null;
    if(this.state.playing) {
      player = <SpotifyPlayer 
      token={this.state.accessToken}
      uris={[this.state.songId]}
      callback={(state) => this.checkSongState(state)}
    />
    }
    return  (
      <>
        <NavBar addTrack={this.addTrack}/>
        {/* <button onClick={this.handleLogin}>spotify login</button> */}
        {/* {newSong} */}
        <button onClick={this.getPlaylists}>get playlists</button>
        <button onClick={this.playSong}> play song</button>
        <button onClick={this.getProgressOfSong}> get progess of song </button>
        <button onClick={this.getTrack}> get track </button>
        <button onClick={this.searchSongs}> look in console for searched songs</button>
        {player}
  
        <CommentsBlock 
            songId = {this.state.songId} 
            addNewComment = {this.addNewComment}
        /> 
        
        {this.state.display ? <div>check your console log and explore the object there </div> : <div></div>}
      </>
      );
  }
}

export default Home;
