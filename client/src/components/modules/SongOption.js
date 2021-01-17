import React, {Component} from "react";

/** 
* @param {String} name - name of song
* @param {String} uri - 'spotify:track:song_id'
* @param {(songid) => ()} addTrack function that takes in songid, posts it to the database
*/

class SongOption extends Component {
    constructor(props) {
        super(props);
    }
    //what is difference between 
    render () {
        return(
            <button className="SongOption-button"
                onClick={() => this.props.addTrack(this.props.uri)}>{this.props.name}</button>
        );
    }
}
export default SongOption;