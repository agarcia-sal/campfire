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
                {label : 'abc', value : 1},
                {label : 'abcdef', value : 2},
                {label : 'abcdefg', value : 3}, 
                {label: 'aefbef', value  : 4},
                {label : 'aebfu', value : 5},
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
                // startDiv = "";
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
                <Link className = "NavBar-otherLinks" to="/popularSongs">popular songs</Link>
                <Link className = "NavBar-otherLinks" to = "/mySongs">my songs</Link> 
            </nav>
            <div className={searchPosition}>
                {searchBar}
            </div>
            </div>
           
        )
    }
}
export default NavBar;