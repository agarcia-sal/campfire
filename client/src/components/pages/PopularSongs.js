import React, { Component } from "react";
import { Link,  navigate} from "@reach/router";
import NavBar from "../modules/NavBar";
// import { Router, Redirect } from '@reach/router';
// import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import "../../utilities.css";
import "./PopularSongs.css";

import { get, post } from "../../utilities.js";

/**
 * @param {boolean} loggedIn - if logged in or not
 */

class PopularSongs extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        // loggedIn : false,
        songs : [],
      };
    }
  
    componentDidMount() {
      // remember -- api calls go here!
      document.title = "Popular Songs";
      get('/api/sortedSongs').then((songs) => {
          this.setState({songs: songs});
        // console.log(songs);
      });
    }
    addSong = (song) => {
        navigate(`/postHome/${song.song_id}`);
    }
    addTrack = (info) => {
        const body = { songId: info.songId, name: info.name};
        post('/api/song', body).then((data) => {
            // this.setState({
            //     playing : true,
            //     songId : info.songId,
            //     accessToken: data.token,
            //     pause : false,
            //     resume : false,
            //     start: false
                
            // }, () => console.log('accessToken'+data.token))
            navigate(`/postHome/${info.songId}`);
            console.log('adding song');
        });
      }
  
    render() {
        // onClick={() => this.addSong(song.song_id)}
        let showSongs = null;
        if(this.state.songs){
            showSongs = this.state.songs.map((song)=>(
                <button className="PopularSongs-button" onClick={()=>this.addSong(song)} >{song.name}</button>
                // <Link key={song.song_id} to={{
                //     pathname:'/home',
                //     aboutProps:{
                //         popId: "spotify:track:1SymEzIT3H8UZfibCs3TYi"
                //     }
                // }} >{song.name}</Link>
            ))
        }
        let popSongs = null;
        if(this.state.songs){
            popSongs = this.state.songs.map((song)=>(
                <div> {song.name}</div>
            ))
        }
        
      
      return (
        // <div className = "Login-gradient">
        //   <h1>This is red car</h1>
        // </div>

        <div className = "PopularSongs-container PopularSongs-gradient">
            <NavBar addTrack={this.addTrack} start={true}/>
            <div className="PopularSongs-songs u-grid">
            {showSongs}
            </div>
        </div>
      );
    }
  }
  
  export default PopularSongs;
  