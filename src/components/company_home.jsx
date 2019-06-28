import React, { Component } from "react";
import axios from "axios";
import * as crypto from "crypto-js";

import Portis from "@portis/web3";
import Web3 from "web3";
import EthSigUtil from "eth-sig-util";

class CompanyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      filehash: "no hash",
      account: "",
      signature: ""
    };
    this.reqSignature = this.reqSignature.bind(this);
    this.uploadSignature = this.uploadSignature.bind(this);
    this.getSignature = this.getSignature.bind(this);
  }
  loadfile = () => {
    const env = this;
    axios
      .get("http://localhost:3000/certificates/1561634979014-t.png", {
        responseType: "arraybuffer"
      })
      .then(function(response) {
        // handle success
        var dt = response["data"];
        var uint = new Uint8Array(dt);
        var sha = crypto.algo.SHA256.create();
        for (var i = 0; i < uint.byteLength; i = i + 100000) {
          var c = String.fromCharCode.apply(null, uint.slice(i, i + 100000));
          sha.update(c);
        }
        var h = sha.finalize();
        console.log("hash :" + h);
        env.setState({ filehash: h });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
        console.log(env.state);
      });
  };

  async reqSignature() {
    const portis = new Portis(
      "0c8ddc0d-28e0-48c5-a5a5-175c6084646b",
      "ropsten"
    );
    const web3 = new Web3(portis.provider);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts });
    console.log(accounts[0]);
    const messageHex =
      "0x" + new Buffer("" + this.state.filehash, "utf8").toString("hex");
    const signedMessage = await web3.currentProvider.send("personal_sign", [
      messageHex,
      accounts[0]
    ]);
    console.log(signedMessage);
    this.setState({ signature: signedMessage });
  }

  async uploadSignature() {
    const portis = new Portis(
      "0c8ddc0d-28e0-48c5-a5a5-175c6084646b",
      "ropsten"
    );
    const web3 = new Web3(portis.provider);
    var abi = [
      {
        constant: false,
        inputs: [
          {
            name: "_Signature",
            type: "string"
          }
        ],
        name: "store",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "Issuer",
            type: "address"
          }
        ],
        name: "getCounter",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "num",
            type: "uint256"
          },
          {
            name: "issuer",
            type: "address"
          }
        ],
        name: "getSignature",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "address"
          },
          {
            name: "",
            type: "uint256"
          }
        ],
        name: "signatures",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      }
    ];
    var store = new web3.eth.Contract(
      abi,
      "0x6c9151f24e1c17c08246a38e0488baf0eb032c30",
      {
        defaultGasPrice: "100000000"
      }
    );
    console.log("signature :" + typeof this.state.signature);
    await store.methods
      .store("kaBOOM" + this.state.signature)
      .send({
        from: this.state.account[0]
      })
      .then(res => {
        console.log(res);
      });
  }

  async getSignature() {
    const portis = new Portis(
      "0c8ddc0d-28e0-48c5-a5a5-175c6084646b",
      "ropsten"
    );
    const web3 = new Web3(portis.provider);
    var abi = [
      {
        constant: false,
        inputs: [
          {
            name: "_Signature",
            type: "string"
          }
        ],
        name: "store",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "Issuer",
            type: "address"
          }
        ],
        name: "getCounter",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "num",
            type: "uint256"
          },
          {
            name: "issuer",
            type: "address"
          }
        ],
        name: "getSignature",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "address"
          },
          {
            name: "",
            type: "uint256"
          }
        ],
        name: "signatures",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      }
    ];
    const todoList = new web3.eth.Contract(
      abi,
      "0x6c9151f24e1c17c08246a38e0488baf0eb032c30"
    );
    var t = await todoList.methods
      .getCounter("0xc45178334981c67098D503c753C40a3912E79522")
      .call();
    // t=JSON.stringify(t);
    console.log(t);
  }

  render() {
    return (
      <div>
        <button onClick={this.loadfile}>Load File</button>
        <button onClick={this.reqSignature}>Sign</button>
        <p>Hash :{"" + this.state.filehash}</p>
        <p>Account :{this.state.account}</p>
        <p>Signature :{this.state.signature}</p>
        <button onClick={this.uploadSignature}>Upload signature</button>
        <button onClick={this.getSignature}>getsignature</button>
      </div>
    );
  }
}

export default CompanyHome;
