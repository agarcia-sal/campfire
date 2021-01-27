import React, { Component } from "react";
import Fire from "./Fire.js";
import FireAnimation from "./FireAnimation.js";
import Emoji from "./Emoji.js";
import "./Emotions.css";
import "../../utilities.css";

import { get, post } from "../../utilities";

/**
 * @param {String} songId 
 */
class Emotions extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      colors: [],
      isPaused : null,
      colorTimers: [],
      colorId: null,
      currColor: null
    }
          
  }

  componentDidMount () {
    console.log('mounting')
    get('api/colors', { songId: this.props.songId }).then((colors) => {
      console.log(this.props.songId)
      this.setState({
        isPaused: false,
        colors: colors,
        colorId: this.props.songId
      }, () => {
        console.log(colors);
        this.startTimers();
      });
    });
  }

  componentDidUpdate () {
    if (this.props.songId !== this.state.colorId){
      get('api/colors', { songId: this.props.songId }).then((colors) => {
        this.setState({
          // colorTimers: [],
          colorId: this.props.songId,
          colors: colors,
          isPaused: false,
          currColor: null,
        })
      })
    }
    if(this.props.pauseTimers && !this.state.isPaused) {
      // console.log('pausing colors')
      this.pauseTimers();
    }
    if(this.props.songProgress && this.state.isPaused) {
      this.resumeTimers();
    }
  }

  startTimers = () => {
    // console.log('starting color timer');
    let colorDisplay = [];
    let colorTimers = [];
    this.state.colors.forEach((color) => {
      colorTimers = colorTimers.concat([{colorId: setTimeout(()=>this.showColor(color), color.progressMs)}])
    })
    this.setState({
      colorId: this.props.songId,
      colorTimers: colorTimers,
    }, () => console.log(this.state.colorTimers))
  }

  pauseTimers = async () => {
    console.log(this.state.colorTimers)
    console.log('pausing colors')
    this.setState({
      isPaused:true,
    })
    this.state.colorTimers.forEach(element => {clearTimeout(element.colorId)});
    console.log('timers ' + this.state.colorTimers)
  }

  resumeTimers = () => {
    const songProgress = this.props.songProgress;
    // let commentsDisplay = []; 
    let colorTimers = [];

    this.state.colors.filter(color => color.progressMs > songProgress).forEach((color) => {
      colorTimers = colorTimers.concat([{colorId: setTimeout(()=>this.showColor(color), color.progressMs-songProgress)}])
    
    })

    this.setState({
      isPaused: false,
      colorTimers: colorTimers,
    }, this.props.setResumeFalse )
  }

  showColor = (color) => {
    console.log('showing color')
    this.setState({
      currColor: color.color
    })
  }

  displayColor = (color) => {
    const body = { songId: this.props.songId, color: color};
    post("/api/color", body);
    console.log('displaying color')
    this.setState({
      currColor : color
    });
  }

  render() {
    let useDefault = true;
    if(this.state.currColor){
      useDefault = false
    }
    return(
      <>
      <div className = "Emotions-inputContainer">
        <div className = "Emotions-emojis" >
        <button className = "button joy" onClick={() => this.displayColor('yellow')} ><Emoji symbol="😁"/></button>
        <button className = "button sad" onClick={() => this.displayColor('blue')} ><Emoji symbol="😔"/></button>
        <button className = "button vibe" onClick={() => this.displayColor('pinkPurple')} ><Emoji symbol="😎"/></button>
        <button className = "button rock" onClick={() => this.displayColor('purple')} ><Emoji symbol="🤘"/></button>
        <button className = "button love" onClick={() => this.displayColor('pink')} ><Emoji symbol="💕"/></button>
        <button className = "button party" onClick={() => this.displayColor('party')}><Emoji symbol="🕺"/></button>
        <button className = "button fire" onClick={() => this.displayColor('orange')}><Emoji symbol="🔥"/></button>
        </div>
      </div>
      <div className = "fire-position">
        <FireAnimation useDefault={useDefault} currColor = {this.state.currColor}/> 
      </div>
      </>
    );
  }
}

export default Emotions;