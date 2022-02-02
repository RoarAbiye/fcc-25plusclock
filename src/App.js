import "./App.css";
import React from "react";
import SessionLength from "./Components/SessionLength";
import Break from "./Components/Break";
import ReactFCCtest from "react-fcctest";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      mainTime: "",
      currentTime: 0,
      sessionLength: 25,
      breakLength: 5,
      counter: null,
      paused: null,
    };
    this.startTimer = this.startTimer.bind(this);
    this.CBbuttonFunctions = this.CBbuttonFunctions.bind(this);
  }
  componentDidMount() {
    let t = this.state.sessionLength * 60;
    let m = this.formater(Math.floor(t / 60));
    let s = this.formater(t % 60);
    this.setState({ mainTime: `${m}:${s}` });
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
        console.log(
          this.state.currentTime +
            " " +
            this.state.mainTime +
            " " +
            this.state.sessionLength
        );
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

  resetTimer = () => {
    clearInterval(this.state.counter);
    this.setState({
      running: false,
      mainTime: "25:00",
      currentTime: 0,
      sessionLength: 25,
      breakLength: 5,
      counter: null,
      paused: null,
    });
  };

  formater(tm) {
    return tm < 10 ? "0" + tm : tm;
  }

  CBbuttonFunctions(action) {
    switch (action) {
      case "increaseSession":
        this.setState({ sessionLength: this.state.sessionLength + 1 });
        console.log("in-ses");
        break;
      case "decreaseSession":
        if (this.state.sessionLength === 1) {
          return;
        } else {
          this.setState({ sessionLength: this.state.sessionLength - 1 });
        }
        break;
      case "increaseBreak":
        if (this.state.breakLength === 60) {
          return;
        } else {
          this.setState({ breakLength: this.state.breakLength + 1 });
          console.log("in-brk");
        }
        break;
      case "decreaseBreak":
        if (this.state.breakLength === 1) {
          return;
        } else {
          this.setState({ breakLength: this.state.breakLength - 1 });
          console.log("de-bre");
        }
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <div class="App">
        {/* fcc test CDN */}
        <ReactFCCtest />
        <div class="Session">
          <div className="timer-label">
            <span className="box-lable">Session</span>
          </div>
          <div id="time-left">
            <span className="time-display">{this.state.mainTime}</span>
          </div>
          <div className="btnContainer">
            <button
              id="start_stop"
              className={`fa ${this.state.running ? "fa-pause" : "fa-play"}`}
              onClick={() => this.startTimer()}
            ></button>
            <button
              className="fa fa-refresh"
              id="reset"
              onClick={() => this.resetTimer()}
            ></button>
          </div>
        </div>
        <div className="SessLength">
          <SessionLength
            sesLength={this.state.sessionLength}
            buttonFunc={this.CBbuttonFunctions}
          />
        </div>

        <div className="BreakLength">
          <Break
            breakLn={this.state.breakLength}
            buttonFunc={this.CBbuttonFunctions}
          />
        </div>
      </div>
    );
  }
}

export default App;
