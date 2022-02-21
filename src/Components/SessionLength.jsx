import React from "react";

class SessionLength extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div id="session-label">
          <div className="timer-label">
            <span className="box-lable">Session Length</span>
          </div>
        </div>
        <div id="session-length">

          <span className="levelOne time-display">{this.props.sesLength}</span>
        </div>
        <div className="btnContainer">
          <button
            className="fa fa-angle-double-down"
            id="session-decrement"
            onClick={() => this.props.buttonFunc("decreaseSession")}
          ></button>
          <button
            className="fa fa-angle-double-up"
            id="session-increment"
            onClick={() => this.props.buttonFunc("increaseSession")}
          ></button>
        </div>
      </div>
    );
  }
}

export default SessionLength;
