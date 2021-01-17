import React, { Component } from "react";
import {Link} from "@reach/router";
import SearchBar from "./SearchBar.js";

// require('dotenv').config();
// const spotifyClientId = process.env.SPOTIFY_API_ID;
/** 
* @param {(songid) => ()} addTrack function that takes in songid, posts it to the database
*/

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
                    <SearchBar addTrack={this.props.addTrack}/>
                </div>
            </nav>
        )
    }
}
export default NavBar;