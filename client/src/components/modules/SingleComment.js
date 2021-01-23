import React, { Component } from "react";
import { Link } from "@reach/router";
import "./SingleComment.css";
/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} songId of parent song
 * @param {string} content of the comment
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComment: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showComment: true })
    }, this.props.delay);
  }

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