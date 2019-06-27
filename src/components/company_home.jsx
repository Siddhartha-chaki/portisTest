import React, { Component } from "react";
import axios from "axios";
import sha256 from "crypto-js/sha256";

class CompanyHome extends Component {
  state = { data: "", hash: "" };

  loadfile = () => {
    const env = this;
    axios
      .get("http://localhost:3000/certificates/test2.pdf", {
        responseType: 'arraybuffer'
      })
      .then(function (response) {
        // handle success
        console.log(response["data"]);
        var dt = response['data']
        //var uint8array = new TextEncoder().encode(dt);
        //var string = new TextDecoder(encoding).decode(uint8array);

        //env.setState({ data: response["data"] });
        console.log(dt);
        var c = String.fromCharCode.apply(null, new Uint8Array(dt));
        console.log(c);
        console.log("Hash " + sha256(c));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed

      });
  };
  render() {
    return (
      <div>
        <button onClick={this.loadfile}>Load File</button>
        <p></p>
      </div>

    );
  }
}

export default CompanyHome;
