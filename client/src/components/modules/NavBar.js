import React, { Component } from "react";
import {Link} from "@reach/router";
import  AsyncSelect  from "react-select/async";
import { get } from "../../utilities.js";
import "./NavBar.css";

// require('dotenv').config();
// const spotifyClientId = process.env.SPOTIFY_API_ID;
/** 
* @param {(songid) => ()} addTrack function that takes in songid, posts it to the database
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
                {labe : 'ahefe', value:6},
            ]
        }
    }
    loadOptions =  (inputValue) => {
        return get('/api/search', { title: inputValue }).then((data) =>
            {
                console.log('body of song')
                console.log(data)
                return data.body.tracks.items.map((item) => (
                    { label: item.name+' - '+item.artists, value: item.uri }));
            });
    }
    onInputChange = (inputValue) => {
        this.setState({value: inputValue})
    }
    handleChoice = (selectedOption) => {
        this.setState({value: selectedOption});
        const uri = selectedOption.value;
        this.props.addTrack(uri);
        console.log('handled choice')

    }
    render () {
        return (
            <nav className="NavBar-container">
                <div className="NavBar-title u-inlineBlock">campfire</div>
                <div className="NavBar-linkContainer u-inlineBlock">
                    <Link to="/" className="NavBar-link">Home</Link>
                </div>
                <div className="NavBar-searchBar u-inlineBlock">
                    <AsyncSelect 
                        cacheOptions
                        defaultOptions
                        value={this.state.value}
                        defaultOptions={this.state.songs}
                        onChange={this.handleChoice}
                        placeholder="search for a song"
                        loadOptions={this.loadOptions}
                    />

                </div>
            </nav>
        )
    }
}
export default NavBar;