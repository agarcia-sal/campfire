import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router, Redirect } from '@reach/router';
import FireAnimation from "../modules/Animation.js";

import "../../utilities.css";
import "./LoginPage.css";

import { get, post } from "../../utilities";

/**
 * @param {boolean} loggedIn - if logged in or not
 */

class LoginPage extends Component {
    constructor(props) {
      super(props);
      // Initialize Default State
      this.state = {
        // loggedIn : false,
        accessToken: null,
      };
    }
  
    componentDidMount() {
      // remember -- api calls go here!
    }

    handleLogin = () => {
      get("/api/spotifyLogin").then((data) => {
        this.setState = ({
            loggedIn: true
        })
        console.log(this.setState);
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
    

  
    render() {
      
      return (
        <div className = "Login-gradient">
          <div className = "Login-outline">
            <div className = "LoginPage-title">
              Campfire
            </div>
            <div className = "about-container">
              <div className = "about-paragraph">
              <h2>
                a web app where you can collectively experience music with others
              </h2>
              <p >
              As you listen to a song, record your thoughts and emotions during your favorite parts. Emotions are reflected
              as colors in the campfire. 
              Your comments and feelings will appear for others as they reach that point in the track. 
              Watch as comments appear on the screen and the fire changes colors to learn about 
              how others experience the song. 
              Users listening to the same song can see each other's comments in red. 
              </p>
              </div>
              <button className = "LoginPage-button LoginPage-position" onClick={this.handleLogin}>Login with Spotify</button>
            </div>
          </div>
        <div className = "fire-pos">
            <FireAnimation login = {true}/>
          </div>
        </div>
      );
    }
  }
  
  export default LoginPage;
  