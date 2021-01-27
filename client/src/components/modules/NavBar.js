import React, { Component } from "react";
import {Link} from "@reach/router";
import  AsyncSelect  from "react-select/async";
import customStyles from "./searchStyles";
import { get } from "../../utilities.js";
import "./NavBar.css";

// require('dotenv').config();
// const spotifyClientId = process.env.SPOTIFY_API_ID;
/** 
* @param {(songid) => ()} addTrack function that takes in songid, posts it to the database
* @param {boolean} start if a song has started or not
*/

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            songs : [
                {label : "'tis the damn season - Taylor Swift", value : 'spotify:track:6sQckd3Z8NPxVVKUnavY1F'},
                {label : 'bellyache - Billie Eilish', value : 'spotify:track:51NFxnQvaosfDDutk0tams'},
                {label : 'The Louvre - Lorde', value : 'spotify:track:5q4BpnMrYEFzLO0dYODj6J'}, 
                {label: 'Roddy - Djo', value  : 'spotify:track:20WSCvv9qfQHzYzTaLyXHH'},
                {label : 'Wait a Minute! - WILLOW', value : 'spotify:track:0y60itmpH0aPKsFiGxmtnh'},
            ]
        }
    }
    loadOptions =  (inputValue) => {
        return get('/api/search', { title: inputValue }).then((data) =>
            {
                console.log('body of song')
                // console.log(data)
                return data.body.tracks.items.map((item) => (
                    { label: item.name+' -'+item.artists.map((artist)=> { return ' '+artist.name}), value: item.uri }));
            });
    }

    onInputChange = (inputValue) => {
        this.setState({value: inputValue})
    }
    handleChoice = (selectedOption) => {
        this.setState({value: selectedOption});
        const uri = selectedOption.value;
        const info = {songId: uri, name: selectedOption.label};
        this.props.addTrack(info);
        console.log('handled choice');

    }
    render () {
        let searchPosition = "NavBar-searchBar";
        let startDiv = "NavBar-start";
            if(!this.props.start){
                searchPosition = "NavBar-center";
            }
        const searchBar = (<AsyncSelect 
          styles = {customStyles}
          theme={theme => ({
              ...theme,
              borderRadius: "15px",
              colors: {
                  ...theme.colors,
                  primary25: '#BCE0F0',
                  primary: '#BCE0F0',
              }})}
          cacheOptions
          defaultOptions
          value={this.state.value}
          defaultOptions={this.state.songs}
          onChange={this.handleChoice}
          placeholder="search for a song"
          loadOptions={this.loadOptions}
        />)
        return (
            <div className = {startDiv}>
            <nav className="NavBar-linkContainer">
                <div className="NavBar-logo u-inlineBlock">
                    <Link className = "home-link" to="/" >CAMPFIRE</Link>
                </div>
                <Link className = "NavBar-otherLinks link-right" to="/popularSongs">popular songs</Link>
                <button 
                onClick = {this.props.logout} 
                className = "NavBar-otherLinks NavBar-logout">
                    logout
                </button>
            </nav>
            <div className={searchPosition}>
                {searchBar}
            </div>
            </div>
           
        )
    }
}
export default NavBar;