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
                // console.log(data)
                return data.body.tracks.items.map((item) => (
<<<<<<< HEAD
                    { label: item.name+' -'+item.artists.map((artist)=> { return ' '+artist.name}), value: item.uri }));
=======
                    { label: item.name+' - '+item.artists.map((artist) => ' '+artist.name), value: item.uri }));
>>>>>>> f9a6f66220760e4ea18289a8067ce1818e351369
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
            <nav className="NavBar-linkContainer">
                <div className="NavBar-title NavBar-logo u-inlineBlock">CAMPFIRE</div>
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
                <div className="NavBar-login">
                    <Link to="/" >LOGIN</Link>
                </div>
            </nav>
        )
    }
}
export default NavBar;