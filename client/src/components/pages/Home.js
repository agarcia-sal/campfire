import React, { Component } from "react";
import { Redirect, navigate} from "@reach/router";
import SpotifyPlayer from 'react-spotify-web-playback';
import NavBar from "../modules/NavBar";
import CommentsBlock from "../modules/CommentBlock.js";
import Emotions from "../modules/Emotions.js";
import "../../utilities.css";
import "./Home.css";
// import FireAnimation from "../modules/Animation.js"
import Fire from "../modules/Fire.svg";
import FireAnimation from "../modules/FireAnimation.js"


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
  displayColor = (color) => {
    this.setState({color: color})
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
        console.log('adding song');
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
    // if (state.track.uri !== this.state.song_id && state.track.uri !== ''){
    //   this.setState({songId : state.track.uri});
    // }
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
      autoplay = {true}
      styles={{
        activeColor: 'transparent',
        bgColor: 'transparent',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: 'transparent',
        sliderTrackColor: 'transparent',
        sliderHandleColor: 'transparent',
        sliderHandleBorderRadius: 0 | 'transparent', 
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
      uris={[this.state.songId]}
      callback={(state) => this.checkSongState(state)}
    />
    }
    // commentsDisplay={this.state.commentsDisplay}
    if (this.state.start){
      comments = (<CommentsBlock className="Home-commentsBlock"
      songId = {this.state.songId} 
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
        <div className = "Home-gradient">
          <div>
            <NavBar addTrack={this.addTrack}/>
          </div>
          {/* <button onClick={this.handleLogin}>spotify login</button> */}
          {/* {newSong} */}
          {/* <button onClick={this.getPlaylists}>get playlists</button>
          <button onClick={this.playSong}> play song</button>
          <button onClick={this.searchSongs}> look in console for searched songs</button> */}
          {/* <div className = "Home-comments" >this is a test comment</div> */}
          <div className = "Home-player">
            {player}
          </div>
          {/* <button onClick={this.startTimers}> start timers</button> */}
          {/* <button onClick={this.pauseTimers}> pause timers</button> */}
          <FireAnimation useDefault={false} light="#fec9ff" medium="#fd8cff" dark="#f122f5"/>
          {comments} 
          {emotions}
          
          {this.state.display ? <div>check your console log and explore the object there </div> : <div></div>}

        </div>
        
      </>
      );
  }
}

export default Home;

