import React, { Component } from "react";
import {Link} from "@reach/router";
import  AsyncSelect  from "react-select/async";
// import styles from "./searchStyles";
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
            ]
        }
    }
    loadOptions =  (inputValue) => {
        return get('/api/search', { title: inputValue }).then((data) =>
            {
                console.log('body of song')
                // console.log(data)
                return data.body.tracks.items.map((item) => (
                    { label: item.name+' - '+item.artists.map((artist) => ' '+artist.name), value: item.uri }));
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
        const customStyles = {
            control: (provided, state) => ({
                ...provided,
                background: 'transparent',
                borderColor: '#02283B',
                minHeight: '35px',
                height: '35px',
                boxShadow: state.isFocused ? null : null,
              }),
          
            valueContainer: (provided, state) => ({
            ...provided,
            height: '35px',
            fontFamily: "Open Sans",
            padding: '0 10px'
            }),
            value: (provide, state) => ({
                height: '26px',
                fontFamily: "Open Sans",
            }),
            input: (provided, state) => ({
            ...provided,
            margin: '0px',
            fontFamily: "Open Sans",
            }),
            indicatorSeparator: state => ({
            display: 'none',
            }),
            indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '35px',
            }),
            placeholder: base => ({
                color: "#02283B",
                fontFamily: "Open Sans",
                height: "26px",
            }),
            menu: base => ({
              ...base,
              color: "#02283B",
              fontFamily: 'Open Sans',
              background: "transparent",
              // override border radius to match the box
              borderRadius: "15px",
              // kill the gap
              marginTop: "3px",
              // kill the white space on first and last option
              padding: "3px", 
            })
          };
        return (
            <nav className="NavBar-linkContainer">
                <div className="NavBar-title NavBar-logo u-inlineBlock">
                    <Link className = "home-link" to="/" >CAMPFIRE</Link>
                </div>
                <div className="NavBar-searchBar u-inlineBlock">
                    <AsyncSelect 
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
                    />

                </div>
              
            </nav>
        )
    }
}
export default NavBar;