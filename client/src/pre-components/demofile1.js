import React, { Component } from "react";
import Demofile from "../pre-components/demofile2";
export default class Demofile1 extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-header x1">Riddle header</div>
        <div className="card-body x2">Riddle body</div>
        <div className="card-footer bg-light x3">Riddle footer</div>
      </div>
    );
  }
}
