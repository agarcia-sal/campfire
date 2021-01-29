import React, { Component } from "react";
import { Redirect, navigate} from "@reach/router";
import SpotifyPlayer from 'react-spotify-web-playback';
import NavBar from "../modules/NavBar";
import CommentsBlock from "../modules/CommentBlock.js";
import Emotions from "../modules/Emotions.js";
import "../../utilities.css";
import "./Home.css";
import Fire from "../modules/Animation.js"
// import Fire from "../modules/Fire.svg";
// import FireAnimation from "../modules/FireAnimation.js"


import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
    //   userId: undefined,
    //   songs: ['spotify:track:6sQckd3Z8NPxVVKUnavY1F'],
    //   // songId: 'spotify:track:6sQckd3Z8NPxVVKUnavY1F',
    //   songId : '',
    //   songNotPlayed: false,
      playing : false,
      start: false,
      pause: false,
      resume : false,
      songProgress : null
    };

    
  }
  

  componentDidMount() {

    get('/api/getMe').then((user) => {
      console.log(user)
      this.setState({
          userId: user.body.id
      }); 
    })
    // if (this.props.popId){
    //   this.setState({
    //     songId: popId,
    //     playing: true,
    //   })
    // }

  }

  
  
  addTrack = (info) => {
    const body = { songId: info.songId, name: info.name};
    const song = info.songId;
    post('/api/song', body).then((data) => {
    //     this.setState({
    //         songs: [data.song.song_id].concat(this.state.songs),
    //         songNotPlayed: false, 
    //         playing : true,
    //         songId : info.songId,
    //         accessToken: data.token,
    //         pause : false,
    //         resume : false,
    //         start: false
            
    //     }, () => console.log('accessToken'+data.token))
    //     console.log('adding song');
    // });
    navigate(`/postHome/${info.songId}`);
    });
  }
  // this gets called when the user pushes "Submit", so their
  // story gets added to the screen right away
  


  
  render() {
    console.log('am rerendering');
    // if (this.state.songNotPlayed){
    //     this.addTrack(this.state.songId);
    // }
   
    
    // commentsDisplay={this.state.commentsDisplay}
   
            
      
      return  (
        <>
          <div className = "Home-gradient">
          <div className = "fire-search"><Fire login = {'prehome'}/></div>
            <div className = "Home-navbar">
              <NavBar addTrack={this.addTrack}/>
            </div>
          </div>
        </>
      );
  }
}

export default Home;

