import React, {Component} from "react";

import { get, post } from "../../utilities";

/* medium article for rough idea: 
https://medium.com/@pradityadhitama/simple-search-bar-component-functionality-in-react-6589fda3385d

also used to-do react homework
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
            this.setState({songs: data.body.tracks.items, keyword: value})
        });
    }
    render () {
        const songNames = this.state.songs.map((item,index) => (
            <div className="SearchBar-options">{item.name}</div>
        ))
        return (
            <div className="SearchBar-container">
                <input
                    type='text'
                    key='random1'
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