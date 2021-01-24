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
 * @param {number} top
 * @param {number} left
 */
class SingleComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
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
    setTimeout(() => this.setState({display: false}), 5000)
    if(this.props.display) {
      return (
        <div className="Card-commentBody text-focus-in">
          <span className = "text-focus-in" style = {{
            position: 'absolute',
            left: this.props.left + 'px',
            top: this.props.top + 'px',
          }}>
            <div className = "text-focus-in">
            {this.state.display && this.props.content}
            </div>
          
          </span>

        </div>
      );
    }
    return (<></>);
  }
}

export default SingleComment;