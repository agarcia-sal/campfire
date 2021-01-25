import React, { Component } from "react";
import SingleComment from "./SingleComment.js";
import { NewComment } from "./InputComment";
import {get, post } from "../../utilities.js";
import { socket } from "../../client-socket.js";
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
 * @param {String} userId
 * @param {Boolean} songProgress
 */
class CommentsBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
        newComments: [],
        comments: [],
        commentId: null,
        commentsDisplay : [],
        timers : [],
        isPaused : null,
        winWidth : window.innerWidth,
        winHeight : window.innerHeight,
        newDisplay : [],
    };
  }

  addNewComment = (comment) => {
      let newComments = this.state.newComments
      newComments = newComments.concat([{comment: comment, 
        progress: comment.progressMs, 
        userId: comment.userId,
        top: this.getRandomNumber(60, 600), 
        left: this.getRandomNumber(100, this.state.winWidth-100)}])
      if (comment.userId !== this.props.userId) {
        get("/api/currentState").then((state) => {
          this.setState({
            currentProgress: state.progressMs, 
            newComments: newComments
          })
        })
      } else {
        this.setState({
          newComments: newComments
        });
      }
  };

  componentDidMount() {
    // console.log('mounting');
    get("/api/comments", { songId: this.props.songId }).then((comments) => {
      this.setState({
        isPaused: false,
        comments: comments
      }, () => {
        this.startTimers();
        // console.log('finsihed mounting');
      });
    });
    socket.on("newComment", (comment) => this.addNewComment(comment));
  };

  componentDidUpdate() {
    if (this.state.commentId !== this.props.songId) {
      get("/api/comments", { songId: this.props.songId }).then((comments) => {
        this.setState({
          displayComments: [],
          newComments: [],
          comments: comments,
          commentId: this.props.songId,
        });
      });
    }
    if(this.props.pauseTimers && !this.state.isPaused) {
      this.pauseTimers();
    }
    if(this.props.songProgress && this.state.isPaused){
      this.resumeTimers();
    } 
  };

  getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  showComment = (index) => {
    // console.log('showing comment')
    let copyArr = this.state.commentsDisplay;// [false, true, true]
    copyArr[index] = {display: true, 
                      top: this.getRandomNumber(60, 600), 
                      left: this.getRandomNumber(100, this.state.winWidth-100)}
    // console.log('adding comment '+copyArr[index])
    this.setState({commentsDisplay : copyArr}, () => console.log(this.state.commentsDisplay))
  }
  startTimers = () => {
    console.log('starting timers for comments')
    let commentsDisplay = [];
    let timers = [];
    this.state.comments.forEach((comment,index) => {
      timers = timers.concat([{timerId: setTimeout(()=>this.showComment(index), comment.progressMs)}])//do i need this.state.timers
      commentsDisplay = commentsDisplay.concat([{display: false, top: null, left: null}]);
    })
    this.setState({
      timers: timers,
      commentsDisplay : commentsDisplay
    }, () => console.log(this.state.commentsDisplay));
  }
  pauseTimers = () => {
    this.state.timers.forEach(element => {clearTimeout(element.timerId)});
    this.setState({
      isPaused:true,
      paused: 'paused',
    })
  }

  resumeTimers = () => {
    console.log('resuming')
    console.log(this.state.commentsDisplay)
    const songProgress = this.props.songProgress;
    let timers = [];
    
    this.state.comments.forEach((comment, index) => {
      if (!this.state.commentsDisplay[index].display) {
        timers = timers.concat([{timerId: setTimeout(()=>this.showComment(index), comment.progressMs-songProgress)}])
      }
    })
    this.setState({
      isPaused: false,
      paused: 'running',
      timers: timers,
    }, this.props.setResumeFalse )
  } //how do i do this without calling didupdate multiple times
  render() {
    console.log('paused ' + this.state.paused)
    // console.log('commentDisplay: ' + this.state.commentsDisplay)
    return (
      <div className="Card-commentSection">
        <div className="story-comments">
          {this.state.newComments.map((commentObj) => (
            <SingleComment 
              key={`SingleComment_${commentObj.comment._id}`}
              comment = {commentObj}
              commentUser = {commentObj.userId}
              progress = {commentObj.progress}
              currentProgress = {this.state.currentProgress}
              display = {true}
              userId = {this.props.userId}
              paused = {this.state.paused}
              top = {commentObj.top}
              left = {commentObj.left}
              _id={commentObj.comment._id}
              songId={commentObj.comment.songId}
              content={commentObj.comment.content}
            />
          ))}
          {this.state.commentsDisplay && this.state.commentsDisplay.map((commentObj, index) => (
            <SingleComment
              key={`SingleComment_${this.state.comments[index]._id}`}
              display = {commentObj.display}
              paused = {this.state.paused}
              top = {commentObj.top}
              left = {commentObj.left}
              _id={this.state.comments[index]._id}
              songId={this.state.comments[index].songId}
              content={this.state.comments[index].content}
            />
          ))}
            <NewComment songId={this.props.songId} addNewComment={this.addNewComment} userId = {this.props.userId}/>
        </div>
      </div>
    );
  }
}

export default CommentsBlock;