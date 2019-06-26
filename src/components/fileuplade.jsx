import React, { Component } from "react";

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
    this.onClierHandler = this.onClierHandler.bind(this);
  }

  
  onClierHandler() {}

  uploadFile(event) {
    let file = event.target.files[0];
    console.log(file);

    if (file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var data = event.target.result;
        console.log("Data: " + data);
      };
      reader.readAsBinaryString(file);
    }
  }

  render() {
    return (
      <span>
        <input type="file" name="myFile" onChange={this.uploadFile} />
        <button
          className="btn-success- btn-block"
          onClick={this.onClierHandler}
        >
          Upload
        </button>
      </span>
    );
  }
}

export default FileInput;
