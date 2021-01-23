import React, { Component } from "react";
import { Link } from "@reach/router";
import "./SingleComment.css";
/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {boolean} showComment of 
 * @param {string} songId of parent song
 * @param {boolean} paused status of song
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   // let timer = setTimeout(() => {
  //   //   this.setState({ showComment: true })
  //   // }, this.props.delay);
  // }

  // componentDidUpdate() {
  //   // if (this.props.paused && !this.state.showComment){
  //   //   clearTimeout(timer);
  //   // if (this.props.resume && !this.state.showComment) {
  //   //   let timer = setTimeout(() => {
  //   //     this.setState({ showComment: true })
  //   //   }, this.props.delay - this.props.progressMs);
  //   // }
  // }

  render() {
    // const { showComment } = this.state
    if(this.props.display) {
      return (

          <span className='SingleComment-comment'>{" | " + this.props.content}</span>

      );
    }
    return (<></>);
  }
}

export default SingleComment;