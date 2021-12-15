import React, { Component } from "react";

export default class RiddleTest extends Component {
  tryFun() {
    return true;
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">Riddle header</div>
        <div className="card-body">Riddle body</div>
        <div className="card-footer bg-light">Riddle footer</div>
      </div>
    );
  }
}
