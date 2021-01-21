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
 * @param {boolean} startTimer boolean
 */
class CommentsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
        newComments: [],
        comments: [],
        commentId: null,
        timers: [],
        commentsDisplay: [],
    };
  }

  addNewComment = (comment) => {
      this.setState({
        newComments: [comment].concat(this.state.newComments),
      });
  };

  showComment = (comment, index) => {
    let copyArr = [...this.state.commentsDisplay]// [false, true, true]
    copyArr[index] = true
    this.setState({commentsDisplay : copyArr})
  }

  startTimers = () => {
    console.log(this.state.comments)
    let commentsDisplay = [];
    let timers = [];
    this.state.comments.forEach((comment,index) => {
      timers = timers.concat([{timerId: setTimeout(()=>this.showComment(comment, index), comment.progressMs)}])//do i need this.state.timers
      commentsDisplay = commentsDisplay.concat([false]);
    })
    this.setState({
      timers: timers,
      commentsDisplay : commentsDisplay
    }, console.log(this.state.commentsDisplay))
  }

  pauseTimers = () => {
    this.state.timers.forEach(element => {clearTimeout(element.timerId)});
  }

  componentDidMount() {
    console.log('mounting');
    get("/api/comments", { songId: this.props.songId }).then((comments) => {
      this.setState({
        comments: comments
      }, () => {
        this.startTimers();
      });
      this.props.displayComments(comments);
    });
  };

  componentDidUpdate() {
    if (this.state.commentId !== this.props.songId) {
      this.pauseTimers();
      get("/api/comments", { songId: this.props.songId }).then((comments) => {
        this.setState({
          newComments: [],
          comments: comments,
          commentId: this.props.songId,
          timers: [],
          commentsDisplay: [], 
        }, () => {
          this.startTimers();
        });
        this.props.displayComments(comments);
      });
    } 
    if (this.props.pauseTrack) {
      this.pauseTimers();
    }
  };

  render() {
    const zero = 0;
    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.state.newComments.map((comment) => (
            <SingleComment 
              showComment = {true}
              key={`SingleComment_${comment._id}`}
              delay = {zero}
              _id={comment._id}
              songId={comment.songId}
              content={comment.content}
            />
          ))}
          {this.state.comments && this.state.comments.map((comment, index) => (
            <SingleComment
              showComment = {this.state.commentsDisplay[index]}
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

