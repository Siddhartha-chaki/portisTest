import React, { Component } from "react";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.onClientHandler = this.onClientHandler.bind(this);
    this.state = {
      selectedFile: null,
      loaded: 0
    };
  }

  onClientHandler() {
    console.log("Hash :" + this.state.hash);
    //console.log("Hash :" + sha256());
    /*const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("filehash", this.state.hash);
    console.log("hash" + this.state.hash);
    axios
      .post("http://localhost:8000/upload", data, {
        // receive two parameter endpoint url ,form data
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        toast.success("upload success");
      })
      .catch(err => {
        toast.error("upload fail");
      });*/
  }

  uploadFile(event) {
    let file = event.target.files[0];
    //console.log(file);
    this.setState({ selectedFile: file, loaded: 0 });
    if (file) {
      var reader = new FileReader();
      reader.onload = () => {
        
        console.log(reader.result);
        var c = String.fromCharCode.apply(null, new Uint8Array(reader.result));
        console.log(c);
        this.setState({ hash: sha256(c) });
      };
      reader.readAsArrayBuffer(file);
    }
  }

  render() {
    return (
      <div>
        <div class="form-group">
          <input type="file" name="myFile" onChange={this.uploadFile} />
          <button
            class="btn btn-success btn-block"
            onClick={this.onClientHandler}
          >
            Upload
          </button>
          <Progress max="100" color="success" value={this.state.loaded}>
            {Math.round(this.state.loaded, 2)}%
          </Progress>
        </div>

        <div class="form-group">
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default FileInput;
