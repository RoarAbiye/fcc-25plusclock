import "./App.css";
import ReactFCCtest from "react-fcctest";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running       : false,
      mainTime      : '25:00',
      sessionLength : 25
    };
  }


  conuntDown = () => {
    let time = this.state.sessionLength*60;

    setInterval(() => {
      if(time<0) {this.setState({running: true}); return}
    let minutes = Math.floor(time/60);
    let seconds = time%60;
      let fminutes  = this.formater(minutes)
      let fseconds  = this.formater(seconds)
      this.setState({ 
        mainTime: `${fminutes}:${fseconds}`
      })
      time--
    }, 1000);
  };

  formater(tm) {
    return (tm<10)?'0'+tm:tm;
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
                    onClick={()=>this.conuntDown(this.state.sessionLength)}
                    className="fa fa-play"
                    id="start_stop"
                  ></button>
                  <button className="fa fa-refresh" id="reset" />
                </div>
                <div id="session-label">
                  <span className="levelOne box-lable">Session Length</span>
                </div>
                <div id="session-length">
                  <span className="levelOne time-display">{this.state.sessionLength}</span>
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

// <span className="fa fa-play" />
// <span className="fa fa-stop" />
