import "./App.css";
import React from "react";
import SessionLength from "./Components/SessionLength";
import Break from "./Components/Break";
import ReactFCCtest from "react-fcctest";
const audio = document.getElementById("beep")

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      runningType: "Session",
      mainTime: "",
      remainingTime: 0,
      sessionLength: 25,
      breakLength: 5,
      counter: null,
      paused: null,
      break: false,
      sessionCounter: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.CBbuttonFunctions = this.CBbuttonFunctions.bind(this);
  }
  componentDidMount() {
    this.displayUpdater(1500, this.state.runningType);
    clearInterval(this.state.counter);
  }

  startTimer = (time) => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;

    this.displayUpdater(time, this.state.runningType);
    time--;
    this.setState({ counter: setInterval(() => {
      date = new Date().getTime();
      console.log("startTimer", time);
      if (date > nextDate) {
        this.displayUpdater(time, this.state.runningType);
        if (time === 0) audio.play();
        this.setState({ remainingTime: time });
        if (time < 0) {
          this.switchSession();
        }
      time--;
        nextDate += second;
      }
    }, 1)
    })
  };

  timerControl = () => {
    console.log("test")
    if (this.state.paused === true) {
      this.setState({ paused: false });
      this.startTimer(this.state.remainingTime);
      return;
    } else if (this.state.paused === false) {
      this.setState({ paused: true });
      clearInterval(this.state.counter);
      return;
    } else if (this.state.paused === null) {
      this.setState({ paused: false });
      this.startTimer(this.state.sessionLength * 60);
      return;
    }
  };
  switchSession = () => {
    if (this.state.runningType === "Break") {
      this.setState({ runningType: "Session", break: false });
      clearInterval(this.state.counter);
      this.startTimer(this.state.sessionLength * 60);
    } else if (this.state.runningType === "Session") {
      this.setState({ runningType: "Break", break: true });
      clearInterval(this.state.counter);
      this.startTimer(this.state.breakLength * 60);
    }
  };

  resetTimer = () => {
    clearInterval(this.state.counter);
    this.setState({
      running: false,
      runningType: "Session",
      mainTime: "25:00",
      remainingTime: 0,
      sessionLength: 25,
      breakLength: 5,
      counter: null,
      paused: null,
      break: false,
      sessionCounter: 0,
    });
    audio.pause();
    audio.currentTime=0;
    // this.displayUpdater(1500, this.state.runningType);
  };

  displayUpdater = (tm, sessionType) => {
    let fmin = Math.floor(tm / 60);
    let fsec = Math.floor(tm % 60);

    this.setState({
      mainTime: `${fmin < 10 ? "0" + fmin : fmin}:${
        fsec < 10 ? "0" + fsec : fsec
      }`,
      runningType: `${sessionType}`,
      remainingTime: tm,
    });
    console.log(this.state.sessionLength, "🖥️");
  };

  CBbuttonFunctions(action) {
    let val;
    switch (action) {
      case "increaseSession":
        val = this.state.sessionLength;
        if (this.state.sessionLength === 60) {
          return;
        } else {
          this.setState({ sessionLength: val + 1 });
          this.displayUpdater(
            (this.state.sessionLength + 1) * 60,
            this.state.runningType
          );
        }
        console.log("inc_ses: ", this.state.sessionLength);
        break;
      case "decreaseSession":
        val = this.state.sessionLength;
        if (this.state.sessionLength === 1) {
          return;
        } else {
          this.setState({ sessionLength: val - 1 });
          this.displayUpdater(
            (this.state.sessionLength - 1) * 60,
            this.state.runningType
          );
        }
        console.log("dec_ses: ", this.state.sessionLength);
        break;
      case "increaseBreak":
        val = this.state.breakLength;
        if (this.state.breakLength === 60) {
          return;
        } else {
          this.setState({ breakLength: val + 1 });
        }
        break;
      case "decreaseBreak":
        val = this.state.breakLength;
        if (this.state.breakLength === 1) {
          return;
        } else {
          this.setState({ breakLength: val - 1 });
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
        <div className="Session">
          <div className="timer-label">
            <span id="timer-label" className="box-lable">
              {this.state.runningType}
            </span>
          </div>
          <div id="time-left">
            <span className="time-display">{this.state.mainTime}</span>
          </div>
          <div className="btnContainer">
            <button
              id="start_stop"
              className={`fa ${this.state.running ? "fa-pause" : "fa-play"}`}
              onClick={() => this.timerControl()}
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
