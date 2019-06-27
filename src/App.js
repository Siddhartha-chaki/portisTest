import React from "react";
//import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import FileInput from "./components/fileuplade";
import PDFViewer from "./components/pdfview";
import CompanyHome from "./components/company_home"
function App() {
  return (
    <div className="App">
       <FileInput />
      {/*<PDFViewer filename="/certificates/test2.pdf"/> */}
      <CompanyHome />
    </div>
  );
}

export default App;
