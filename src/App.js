import "./App.css";
import ReactFCCtest from "react-fcctest";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      mainTime: "25:00",
      currentTime: 0,
      sessionLength: 25,
      counter: null,
      paused: null,
    };
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer = () => {
    this.setState({ paused: !this.state.paused });
    let time, minutes, seconds;
    if (this.state.paused === null) {
      time = this.state.sessionLength * 60;
      minutes = this.formater(Math.floor(time / 60));
      seconds = this.formater(time % 60);
      this.setState({ paused: false });
    } else if (this.state.paused) {
      time = this.state.currentTime;
      this.setState({ paused: false });
    } else if (!this.state.paused) {
      this.setState({ paused: true });
    }
    if (!this.state.running) {
      this.setState({ running: true });
      this.state.counter = setInterval(() => {
        console.log(this.state.currentTime + ' ' + this.state.mainTime + ' ' + this.state.sessionLength)
        minutes = this.formater(Math.floor(time / 60));
        seconds = this.formater(time % 60);

        if (time <= 0) {
          clearInterval(this.state.counter);
          return;
        }

        this.setState({
          mainTime: `${minutes}:${seconds}`,
          currentTime: time,
        });
        time--;
      }, 1000);
      return;
    }
    if (this.state.running) {
      this.setState({ running: false, paused: true });
      clearInterval(this.state.counter);
      return;
    }
  };

  resetTimer = () => {};

  formater(tm) {
    return tm < 10 ? "0" + tm : tm;
  }

  render() {
    return (
      <div class="App">
        {/* fcc test CDN */}
        <ReactFCCtest />

        {/*application wraper*/}
        <div class="wrapper">
          <div className="break-wrapper">
            <div id="break-label">
              <div className="session-wrapper">
                {/*session start*/}
                <div className="session-display">
                  <div id="timer-label">
                    <span className="box-lable">Session</span>
                  </div>
                  <div id="time-left">
                    <span className="time-display">{this.state.mainTime}</span>
                  </div>
                  <button
                    id="start_stop"
                    className={`fa 
                      ${this.state.running ? "fa-pause" : "fa-play"}`}
                    onClick={() => this.startTimer()}
                  ></button>
                  <button className="fa fa-refresh" id="reset" />
                </div>
                <div id="session-label">
                  <span className="levelOne box-lable">Session Length</span>
                </div>
                <div id="session-length">
                  <span className="levelOne time-display">
                    {this.state.sessionLength}
                  </span>
                </div>
                <button
                  className="fa fa-angle-double-down"
                  id="session-decrement"
                ></button>
                <button
                  className="fa fa-angle-double-up"
                  id="session-increment"
                ></button>
              </div>
              {/* break lenght starting */}
              <span className="levelTwo box-lable">Break Length</span>
              <div id="break-length">
                <span className="levelTwo time-display">5</span>
              </div>
              <button
                className="fa fa-angle-double-down"
                id="break-decrement"
              ></button>
              <button
                className="fa fa-angle-double-up"
                id="break-increment"
              ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
