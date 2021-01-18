import React, { Component } from "react";
import { Link } from "@reach/router";
// import "./SingleComment.css";
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
  }

  render() {
    return (
      <div className="Card-commentBody">
        <span>{" | " + this.props.content}</span>
      </div>
    );
  }
}

export default SingleComment;