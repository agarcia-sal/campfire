import React, { Component } from "react";
import {Link} from "@reach/router";
import SearchBar from "./SearchBar.js";
import SearchPage from "./SearchPage.js"

// require('dotenv').config();
// const spotifyClientId = process.env.SPOTIFY_API_ID;

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
                    <SearchBar/>
                </div>
            </nav>
        )
    }
}
export default NavBar;