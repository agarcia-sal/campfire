import React, { Component } from "react";
import { Link } from "@reach/router";
import "./SingleComment.css";
/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {boolean} showComment of 
 * @param {string} songId of parent song
 * @param {number} top
 * @param {number} progress
 * @param {number} currentProgress
 * @param {String} userId
 * @param {String} commentUser
 * @param {number} left
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true,
      description: null
    }

  }
  componentDidUpdate() {

    if (!this.state.display) {
      this.setState({
        display: true
      })
    }
  }


  render() {
    console.log('current progress ' + this.props.currentProgress)
    let description = null;
    if (this.props.currentProgress !== null){
      const diff = Math.abs(this.props.currentProgress - this.props.progress) 
      if (this.props.currentProgress > this.props.progress) {
        description = Math.round(diff/1000) + " seconds behind";
      } else {
        description = Math.round(diff/1000) + " seconds ahead";
      }
    }
    let commentAnimation = 'slide-right';
    if(this.props.display) {

      if (this.props.userId !== this.props.commentUser){
        return (
          <div className="Card-commentBody">
            <span  style = {{
              position: 'absolute',
              left: this.props.left + 'px',
              top: this.props.top + 'px',
            }}>
              <div className = {commentAnimation} >
                <div>{this.state.display && this.props.content}</div>
                <div>{this.state.display && "this user is currently " + description}</div>
              </div>
            </span>
          </div>
        );
      } else {
        return (
          <div className="Card-commentBody">
            <span  style = {{
              position: 'absolute',
              left: this.props.left + 'px',
              top: this.props.top + 'px',
            }}>
              <div className = {commentAnimation} >{this.state.display && this.props.content}</div>
            </span>
          </div>
        );

      }

    } 
    return (<></>);
  };
};

export default SingleComment;