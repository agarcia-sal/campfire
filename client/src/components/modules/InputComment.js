import React, { Component } from "react";
import { get, post } from "../../utilities";
import "./SingleComment.css";
/**
 * InputComment is a New Post component for comments
 *
 * Proptypes
 * @param {(value) => void} addComment (function) triggered when player submits comment
 * @param {string} songId is song to add comment to
 */
class InputComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  getProgress = () => {
    get('api/currentTrack').then((data) => {
        this.setState({
            progressMs: data.body.progress_ms,
        })
    })
  }

  // called whenever the user types in the new post input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addComment && this.props.addComment(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        <input 
          type="text"
          placeholder={"add a comment"}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} songId is song to add comment to
 */
class NewComment extends Component {
    constructor(props) {
      super(props);
    }
  //TODO: timestamp 
  // comment content are passed into addComment
    addComment = (value) => {
      console.log('userId' + this.props.userId)
      const body = { songId: this.props.songId, content: value, userId: this.props.userId};
      post("/api/comment", body).then((comment) => {
        // display this comment on the screen
        this.props.addNewComment(comment);
      });
    };
  
    render() {
      return (
      <div className = "input-container">
      <div className = "input-bar">
        <InputComment 
                songId = {this.props.songId} 
                addComment={this.addComment} 
          />
      </div>
      </div>
      );
    }
  }


export { InputComment, NewComment };