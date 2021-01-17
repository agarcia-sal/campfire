import React, { Component } from "react";
import {Link} from "@reach/router";


const spotifyClientId = SPOTIFY_CLIENT_ID;

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <nav className="NavBar-container">
                <div className="NavBar-title">Campfire</div>
                <div className="NavBar-linkContainer">
                    <Link to="/" className="NavBar-link">Home</Link>
                </div>
                <div className="NavBar-searchBar">
                    
                </div>
            </nav>
        )
    }
}