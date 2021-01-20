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
        newComments: [],
        comments: [],
        commentId: null,
    };
  }

  addNewComment = (comment) => {
      this.setState({
        newComments: [comment].concat(this.state.newComments),
      });
  };

  componentDidMount() {
    console.log('mounting');
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
          newComments: [],
          comments: comments,
          commentId: this.props.songId,
        });
      });
    }
  };

  render() {
    const zero = 0;
    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.state.newComments.map((comment) => (
            <SingleComment 
              key={`SingleComment_${comment._id}`}
              delay = {zero}
              _id={comment._id}
              songId={comment.songId}
              content={comment.content}
            />
          ))}
          {this.state.comments.map((comment) => (
            <SingleComment
              key={`SingleComment_${comment._id}`}
              delay = {comment.progressMs}
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

