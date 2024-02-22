import React, { Component } from 'react';

import "./App.css"

class Stopwatch extends Component {
  state={inputValue:null,timer:null,timerValue:null,isTimerSet: false,actualTimerInSec:null}
  
  startTimer=()=>{
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({
        actualTimerInSec: prevState.actualTimerInSec - 1
      }));
    }, 1000);
  }


  playAlarm = () => {
    this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    this.audio = new Audio(this.url);
    this.audio.play()
    clearInterval(this.intervalId)
  };

  stopAudio(){
    window.location.reload()
  }

  onChangeInput=(event) => {
    this.setState({timer:event.target.value})
    this.setState({inputValue:event.target.value})

  }
  reSetTimer=()=>{
    window.location.reload()
  }
  setTimer =()=>{
    const {timer}=this.state
    this.setState({timerValue:timer*15})
    this.setState({actualTimerInSec:timer*15})
    this.setState({inputValue:""})
    this.setState({isTimerSet:true})
  }
 

  render() {
    const {timer,timerValue,inputValue,isTimerSet,actualTimerInSec}= this.state
    if(actualTimerInSec===0){
      this.playAlarm();
    }
    return (
      <div className="main-background">
       <div className='alarm-container'>
        <h1>ALARM</h1>
          <div>
            <p>Set Timer in Minutes </p>
              <div>
              <input type="number" value={inputValue} onChange={this.onChangeInput}  placeholder='Enter ' className="input-timer"/>
              <button onClick={this.setTimer} className='set-button'>SET</button>
              <button onClick={this.reSetTimer} className='set-button'>RESET</button>
              </div>
              <div>
                {isTimerSet && <p>Timer has been set for {timerValue/60} Minutes.</p>}
                {isTimerSet && <button onClick={this.startTimer}>Start Timer</button>}
                {isTimerSet && <h1>Remaining Time {actualTimerInSec} Sec</h1>}
                {isTimerSet && <button onClick={this.stopAudio}>Stop audio</button>}
              </div>
          </div>
       </div>
      </div>
    );
  }
}

export default Stopwatch;