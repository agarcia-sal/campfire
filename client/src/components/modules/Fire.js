import React, { Component } from "react";

/**
 * @param {String} songId 
 * @param {Array} colors 
 * @param {String} currColor
 */ 
class Fire extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currColor: null,
    }
  }


  render() {
    console.log('fire rerendering')
    console.log(this.props.currColor)
    if (this.props.currColor){
      return (
        <div
          style={{
            backgroundColor: this.props.currColor,
            width: '100px',
            height: '100px'
          }}
        />
      );
    } else {
      return (
        <div
        style={{
          backgroundColor: "grey",
          width: '100px',
          height: '100px'
        }}
        />
      );
    }
  }
}

export default Fire;