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
 * @param {String} userId - the current user's spotify id
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
        currentProgress: null,
        timers : [],
        isPaused : null,
        winWidth : window.innerWidth,
        winHeight : window.innerHeight,
        newDisplay : [],
    };
  }

  addNewComment = (comment) => {
    console.log(comment);
    console.log(this.props.songId);
    if (comment.songId === this.props.songId) {
      console.log(comment);
      let newComments = this.state.newComments
      let coords = this.getRandomNumber(0.1 * this.state.winWidth, 0.8 * this.state.winWidth, 0.08 * this.state.winHeight, 0.8 * this.state.winHeight);
      newComments = newComments.concat([{comment: comment, 
        progress: comment.progressMs, 
        userId: comment.spotifyId,
        top: coords.y_coord, 
        left: coords.x_coord}])
      if (comment.spotifyId !== this.props.userId) {
        console.log('getting song progress')
        get("/api/currentState").then((state) => {
          console.log('progress ' + state.body.progress_ms)
          this.setState({
            currentProgress: state.body.progress_ms, 
            newComments: newComments
          })
        })
      } else {
        console.log('spotify id is equal to user id')
        this.setState({
          newComments: newComments
        });
      }
    }
  };

  componentDidMount() {
    console.log('mounting');
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
    console.log('updating')
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

  getRandomNumber = (min_x, max_x, min_y, max_y) => {
    let x_coord = Math.random() * (max_x - min_x) + min_x;
    let y_coord = Math.random() * (max_y - min_y) + min_y;
    // windowHeight * vh / 100.
    let fire_left = this.state.winWidth * 0.28;
    let fire_width = this.state.winWidth * 0.4;
    let fire_height = this.state.winHeight * 0.4;
    let fire_top = this.state.winHeight * 0.3;
    console.log('fire_left ' + fire_left)
    console.log('fire_width ' + fire_width)
    console.log('fire_top ' + fire_top)
    console.log('fire_height ' + fire_height)
    console.log('x_coord ' + x_coord)
    if ((fire_left) < x_coord && x_coord < (fire_left + fire_width)) { 
      console.log('hi')
      while ((fire_top + fire_height) > y_coord && y_coord > fire_top){
        console.log('another loop')
        y_coord = Math.random() * (max_y - min_y) + min_y;
      }
      return {x_coord: x_coord, y_coord: y_coord};
    } else {
      return {x_coord: x_coord, y_coord: y_coord};
    }
  }

  showComment = (index) => {
    // console.log('showing comment')
    let copyArr = this.state.commentsDisplay;// [false, true, true]
    let coords = this.getRandomNumber(0.1 * this.state.winWidth, 0.8 * this.state.winWidth, 0.08 * this.state.winHeight, 0.8 * this.state.winHeight);
    copyArr[index] = {display: true, 
                      top: coords.y_coord, 
                      left: coords.x_coord}
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
    console.log(this.state.comments)
    console.log('isPaused: ' + this.state.isPaused)
    // console.log('paused ' + this.state.paused)
    // console.log('commentDisplay: ' + this.state.commentsDisplay)
    console.log('the song id for commentblock is:'+this.props.songId);
    if (this.state.isPaused === null) {
      console.log('hi');
      return <></>
    } else {
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
    );}
  }
}

export default CommentsBlock;
