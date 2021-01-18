import React, { Component } from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./InputComment";
import {get, post } from "../../utilities.js";
/**
 * @typedef ContentObject
 * @property {string} _id of comment
 * @property {string} creator_name
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} story
 */
class CommentsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
        comments: [],
        commentId: null,
    };
  }

  addNewComment = (comment) => {
      this.setState({
        comments: [comment].concat(this.state.comments),
      });
  };

  componentDidMount() {
    get("/api/comments", { songId: this.props.songId }).then((comments) => {
      this.setState({
        comments: comments
      });
    });
  };

  componentDidUpdate() {
    if (this.state.commentId !== this.props.songId) {
      get("/api/comments", { songId: this.props.songId }).then((comments) => {
        this.setState({
          comments: comments,
          commentId: this.props.songId
        });
      });
    }
  };

  render() {

    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.state.comments.map((comment) => (
            <SingleComment
              key={`SingleComment_${comment._id}`}
              _id={comment._id}
              songId={comment.songId}
              content={comment.content}
            />
          ))}
            <NewComment songId={this.props.songId} addNewComment={this.addNewComment} />
        </div>
      </div>
    );
  }
}

export default CommentsBlock;

