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
      runningType: "Session",
      mainTime: "",
      remainingTime: 25,
      sessionLength: 25,
      breakLength: 5,
      counter: null,
      paused: null,
      break: false,
      sessionCounter: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.CBbuttonFunctions = this.CBbuttonFunctions.bind(this);
  }
  componentDidMount() {
    let iniTime = this.state.sessionLength * 60;
    this.displayUpdater(iniTime, this.state.runningType);
    clearInterval(this.state.counter);
  }

  startTimer = () => {
    this.setState({ paused: !this.state.paused });

    //{{{ **assinging time variable eather from break or sessin length**
    let time;
    if (this.state.paused === null) {
      time = this.state.sessionLength*60;
      this.setState({ paused: false });
    } else if (this.state.paused) {
      time = this.state.remainingTime-1;
      this.setState({ paused: false });
    } else if (!this.state.paused) {
      this.setState({ paused: true });
      time = this.state.remainingTime-1;
    }
    //}}}
    this.displayUpdater(time, this.state.runningType);
    if (!this.state.running) {
      this.setState({ running: true });
      //interval
      this.state.counter = setInterval(() => {
        // chunk to be fixed
        if (time >= 0) {
          this.displayUpdater(time, this.state.runningType);
  
            console.log({
              mt: this.state.mainTime,
              // bt: this.state.breakLength,
              time: time,
            });
           
        } else if (time===0){
          if (this.state.break) {
            this.setState({
              break: false,
            });
            this.displayUpdater(time, "Session");
            time = this.state.sessionLength * 60;
            
            console.log({
              mt: this.state.mainTime,
              time: time
              // bt: this.state.breakLength,
            });
            
          } else if (!this.state.break) {
            this.setState({
              break: true,
            });
            this.displayUpdater(time, "Break");
            time = this.state.breakLength * 60;
  
            console.log({
              mt: this.state.mainTime,
              time: time,
            });
           
          }
        }
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
      runningType: "Session",
      mainTime: "25:00",
      remainingTime: 25,
      sessionLength: 25,
      breakLength: 5,
      counter: null,
      paused: null,
      break: false,
      sessionCounter: 0,
    });
  };

  displayUpdater(tm,sessionType) {
    let fmin = Math.floor(tm / 60);
    let fsec = Math.floor(tm % 60);

    this.setState({
      mainTime: `${fmin < 10 ? "0" + fmin : fmin}:${
        fsec < 10 ? "0" + fsec : fsec
      }`,
      runningType: `${sessionType}`,
      remainingTime: tm
    });
  }

  CBbuttonFunctions(action) {
    switch (action) {
      case "increaseSession":
        if (this.state.sessionLength === 60) {
          return;
        } else {
          this.setState({ sessionLength: this.state.sessionLength + 1 });
          this.displayUpdater(this.state.sessionLength  * 60, this.state.runningType);
        }
        break;
      case "decreaseSession":
        if (this.state.sessionLength === 1) {
          return;
        } else {
          this.setState({ sessionLength: this.state.sessionLength - 1 });
          this.displayUpdater(this.state.sessionLength * 60, this.state.runningType);
        }
        break;
      case "increaseBreak":
        if (this.state.breakLength === 60) {
          return;
        } else {
          this.setState({ breakLength: this.state.breakLength + 1 });
        }
        break;
      case "decreaseBreak":
        if (this.state.breakLength === 1) {
          return;
        } else {
          this.setState({ breakLength: this.state.breakLength - 1 });
        }
        break;
      default:
        return;
    }
  }

  // pression the session increment/decrement buttons should update
  // the time remaining display immediately if both these conditions
  // are true: the clock is not currently running AND the timer is
  // currently in ‘break’ mode/state. What all this means is that when
  // you first load your app, if you press +/- on your session buttons,
  // it will reflect in the display time right away, but when you hit play,
  // you then cannot change length using same buttons
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
