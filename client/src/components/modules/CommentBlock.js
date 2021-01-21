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
 * 
 * @param {String} songId - songId of song whose comments we are getting
 * @param {Boolenan[]} commentsDisplay - array of boolean values corresponding to whether we will show that comment or not
 * @param {(comment) => {}} addNewComment - adds a new comment
 * @param {Boolean} startTimers - whether start timers have started or not
 * @param {Boolean} pauseTimers - whether timers have been paused or not
 */
class CommentsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
        comments: [],
        commentId: null,
        commentsDisplay : [],
        timers : [],
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
      }, () => this.startTimers());
    });
    // if(this.props.startTimers){
    //   this.startTimers();
    // }
  };

  componentDidUpdate() {
    if (this.state.commentId !== this.props.songId) {
      get("/api/comments", { songId: this.props.songId }).then((comments) => {
        this.setState({
          comments: comments,
          commentId: this.props.songId,
        });
      });
    }
    if(this.props.pauseTimers ) {
      this.pauseTimers();
    }
  };
  showComment = (comment, index) => {
    let copyArr = [...this.state.commentsDisplay]// [false, true, true]
    copyArr[index] = true
    this.setState({commentsDisplay : copyArr}, () => console.log(this.state.commentsDisplay))
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
    }, () => console.log(this.state.commentsDisplay))
    // console.log(commentsDisplay)
  }
  pauseTimers = () => {
    this.state.timers.forEach(element => {clearTimeout(element.timerId)});
  }
  resumeTimers = () => {
    songProgress = this.props.songProgress;
    console.log(this.state.comments)
    let commentsDisplay = [];
    let timers = [];
    this.state.comments.filter(comment => comment.progressMs > songProgress).forEach((comment,index) => {
      timers = timers.concat([{timerId: setTimeout(()=>this.showComment(comment, index), comment.progressMs-songProgress)}])//do i need this.state.timers
      commentsDisplay = commentsDisplay.concat([false]);
    })
    this.setState({
      timers: timers,
      commentsDisplay : commentsDisplay
    }, () => console.log(this.state.commentsDisplay))
  }
  render() {

    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.state.comments.map((comment,index) => (
            <SingleComment
              key={`SingleComment_${comment._id}`}
              // delay = {comment.progressMs}
              display = {this.state.commentsDisplay[index]}
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

