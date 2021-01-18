import React, {Component} from "react";

import { get, post } from "../../utilities";

/* medium article for rough idea: 
https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d
https://medium.com/path2code/create-suggested-search-bar-with-react-select-f24fa3c5c3b 
also used to-do react homework
*/

/** 
* @param {(songid) => ()} addTrack function that takes in songid, posts it to the database
* songid should be the uri so- spotify:track:id
*/


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs : [],
            keyword : '',
        }
    }
    handleInputChange = async (event) => {
        const value = event.target.value;
        get('/api/search', {title: value}).then((data) => {
            console.log(data.body);
            this.setState({songs: data.body.tracks.items, keyword: value})
        });
    }

    // {/*<SongOption name={item.name} uri={item.uri} addTrack={this.props.addTrack}/>*/}
    render () {
        let songNames = this.state.songs.map((item,index) => (
            <SongOption key={`random-${index}`} name={item.name} uri={item.uri} addTrack={this.props.addTrack}/>));
        return (
            <div className="SearchBar-container">
                <input
                    type='text'
                    value={this.props.value}
                    placeholder={'search a song'}
                    onChange={(event) => this.handleInputChange(event)}
                    />
                {songNames}
            </div> 
        );
    }   
}
export default SearchBar;