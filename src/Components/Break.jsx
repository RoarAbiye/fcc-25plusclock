import React from "react";

class Break extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="timer-label">
          <span id="break-label" className="box-lable">
            Break Length
          </span>
        </div>
        <div id="break-length">
          <span className="levelTwo time-display">{this.props.breakLn}</span>
        </div>

        <div className="btnContainer">
          <button
            onClick={() => this.props.buttonFunc("decreaseBreak")}
            className="fa fa-angle-double-down"
            id="break-decrement"
          ></button>

          <button
            onClick={() => this.props.buttonFunc("increaseBreak")}
            className="fa fa-angle-double-up"
            id="break-increment"
          ></button>
        </div>
      </div>
    );
  }
}

export default Break;
