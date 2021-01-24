import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Login from "./pages/LoginPage.js";
import Home from "./pages/Home.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined, 
      loggedIn: false,
    };  
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      } else {
        navigate('/')
      }
    });
  }

  handleLogin = () => {
    get("/api/spotifyLogin").then((data) => {
      this.setState = ({
        loggedIn: true,
        userId: 100, 
    })
    console.log(this.setState);
    console.log((data))
    // window.location.href = data.url
    })
  }

  handleLogout = () => {
    this.setState({ userId: undefined });
    console.log("logging out")
    post("/api/logout");
  };


  render() {
    return (
      <>
      <div className = "App-gradient">
        <Router>
          <Home path="/home" userId = {this.state.userId}/>
          <Login
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          /> 
          
          <NotFound default />
        </Router>
      </div>
      </>
    );
  }
}

export default App;
