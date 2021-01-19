import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router, Redirect } from '@reach/router';

import "../../utilities.css";

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
        <>
        {/* //  {if (this.state.loggedIn) { */}
        {/* //     (<Redirect to="/dashboard" />)} */}
        <button onClick={this.handleLogin}>Login with Spotify</button>
        </>
      );
    }
  }
  
  export default LoginPage;
  