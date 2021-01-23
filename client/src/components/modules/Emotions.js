import React, { Component } from "react";
import Fire from "../modules/Fire.js";

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
          colorTimers: [],
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
    this.state.colors.forEach((color,index) => {
      colorTimers = colorTimers.concat([{colorId: setTimeout(()=>this.showColor(color), color.progressMs)}])
    })
    this.setState({
      colorTimers: colorTimers,
    })
  }

  pauseTimers = () => {
    console.log('pausing colors')
    this.state.colorTimers.forEach(element => {clearTimeout(element.colorId)});
    this.setState({
      isPaused:true
    })
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
    return(
      <>
        <button onClick={() => this.displayColor('yellow')} >Joy/Happiness</button>
        <button onClick={() => this.displayColor('blue')} >Sadness</button>
        <button onClick={() => this.displayColor('green')} >Vibing</button>
        <button onClick={() => this.displayColor('purple')} >Rocking out</button>
        <button onClick={() => this.displayColor('pink')} >Love</button>
        <button onClick={() => this.displayColor('orange')}>Party</button>

        <Fire songId = {this.props.songId}  currColor = {this.state.currColor}/> 
      </>
    );
  }
}

export default Emotions;