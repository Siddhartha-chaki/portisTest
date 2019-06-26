import React, { Component } from "react";

class HomeButtons extends Component {
  state = { visiable: false };
  render() {
    return (
      <div>
        <button onClick={this.props.showCandidate}>Candidate</button>
        <button onClick={this.props.showCompany}>Company</button>
      </div>
    );
  }
}
export default HomeButtons;
