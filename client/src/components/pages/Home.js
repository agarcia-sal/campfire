import React, { Component } from "react";
import { Redirect, navigate} from "@reach/router";
import SpotifyPlayer from 'react-spotify-web-playback';
import NavBar from "../modules/NavBar";
import CommentsBlock from "../modules/CommentBlock.js";
import Emotions from "../modules/Emotions.js";
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
      start: false,
      pause: false,
      resume : false,
      songProgress : null
    };

    if(!this.props.userId) {
      navigate('/');
    }
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


  
  addTrack = (songId) => {
    const body = { songId: songId}
    post('/api/song', body).then((data) => {
        this.setState({
            songs: [data.song.song_id].concat(this.state.songs),
            songNotPlayed: false, 
            playing : true,
            songId : songId,
            accessToken: data.token,
            pause : false,
            resume : false,
            start: false
            
        }, () => console.log('accessToken'+data.token))
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
    if (state.isPlaying && state.progressMs === 0){
      console.log('starting to play')
      this.setState({start: true})
    }else if (!state.isPlaying && state.progressMs !== 0){
      console.log('pausing');
      this.setState({pause: true, songProgress: null})
    }
    else if (state.isPlaying && state.progressMs !== 0){
      console.log("resuming the song")
      this.setState({songProgress: state.progressMs, pause: false})
    }


  }
  setResumeFalse = () => {
    this.setState({songProgress : null})
  }
  render() {
    console.log('am rerendering');
    // if (this.state.songNotPlayed){
    //     this.addTrack(this.state.songId);
    // }
    let player = null;
    let newSong = null;
    let emotions = null;
    let comments = null;
    if(this.state.playing) {
      player = <SpotifyPlayer 
      token={this.state.accessToken}
      // token="BQAQ7-yNF16xOePwyJgqtVhDJDfkG2zyppYzUVY2aPn1EVBzmGG3s-XhxopDmi2bquj85UbToGhlrv0qsjgEF8VLgrjcA36024lE0I-pIbFSsdiYZSGlHAJgUKCQIvsNykEOSsHLVwQGsgsT-T6E53v5567zaIabwmD0k2HEZdfYqC61S-H3DA8"

      // autoPlay
      uris={[this.state.songId]}
      callback={(state) => this.checkSongState(state)}
    />
    }
    // commentsDisplay={this.state.commentsDisplay}
    if (this.state.start){
      comments = (<CommentsBlock 
      songId = {this.state.songId} 
      
      // addNewComment = {this.addNewComment}
      resume = {this.state.resume}
      startTimers = {this.state.start}
      pauseTimers={this.state.pause}
      songProgress={this.state.songProgress}
      setResumeFalse={this.setResumeFalse}
    />);
      
      emotions = (<Emotions 
        songId = {this.state.songId}
        songProgress={this.state.songProgress}
        pauseTimers={this.state.pause}
        setResumeFalse={this.setResumeFalse}/>);
    }
    return  (
      <>
        <NavBar addTrack={this.addTrack}/>
        {/* <button onClick={this.handleLogin}>spotify login</button> */}
        {/* {newSong} */}
        <button onClick={this.getPlaylists}>get playlists</button>
        <button onClick={this.playSong}> play song</button>
        <button onClick={this.searchSongs}> look in console for searched songs</button>
        {player}
        <button onClick={this.startTimers}> start timers</button>
        <button onClick={this.pauseTimers}> pause timers</button>
  
        {comments} 
        {emotions}
        
        {this.state.display ? <div>check your console log and explore the object there </div> : <div></div>}

      </>
      );
  }
}

export default Home;

