import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router, Redirect } from '@reach/router';
import Fire from "../modules/Animation.js";
import FireAnimation from "../modules/FireAnimation.js";

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
        <div className = "LoginPage-title">
          Campfire
        </div>
        <p>
          words words words words words words words words words
          words words words words words words words words words
          words words words words words words words words words
          words words words words words words words words words
        </p>
        <button onClick={this.handleLogin}>Login with Spotify</button>
        <Fire useDefault={false} currColor="party"/>
        {/* <FireAnimation useDefault={false} currColor="pinkPurple"/> */}
        </div>
      );
    }
  }
  
  export default LoginPage;
  