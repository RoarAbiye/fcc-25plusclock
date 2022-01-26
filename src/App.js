import "./App.css";
import ReactFCCtest from "react-fcctest";
import React from "react";

class App extends React.Component {
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
                  <span className="time-display">25:00</span>
                </div>
                <button className="fa fa-play" id="start_stop"></button>
                <button className="fa fa-refresh" id="reset" />
              </div>
                <div id="session-label">
                  <span className="levelOne box-lable">Session Length</span>
                </div>
                <div id="session-length">
                  <span className="levelOne time-display">25</span>
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
