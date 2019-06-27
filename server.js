var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");

const path = require("path");
const fs = require("fs");
const directoryPath = path.join("public/", "certificates");
app.use(cors());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/certificates/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});
app.get("/listdir", function(req, res) {
  fs.readdir(directoryPath, function(er, files) {
    if (er) {
      return console.log("Unable to scan directory: " + err);
    } else {
      res.send(JSON.stringify(files));
    }
  });
});

app.listen(8000, function() {
  console.log("App running on port 8000");
});
