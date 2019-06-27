import React, { Component } from "react";
import axios from "axios";
import sha256 from "crypto-js/sha256";

class CompanyHome extends Component {
  state = { data: "", hash: "" };
  loadfile = () => {
    const env = this;
    axios
      .get("http://localhost:3000/certificates/1561634979014-t.png")
      .then(function(response) {
        // handle success
        console.log(response["data"]);
        env.setState({ data: response["data"] });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
        console.log("Hash " + sha256(env.state.data));
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.loadfile}>Load File</button>
      </div>
    );
  }
}

export default CompanyHome;
