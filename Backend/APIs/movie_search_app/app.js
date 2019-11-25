var express = require("express");
var app = express();
var rp = require("request-promise");

app.get("/results", (req, res) => {
  rp("http://www.omdbapi.com/?t=harry&apikey=thewdb")
    .then(body => {
      var parsedData = JSON.parse(body);
      res.send(parsedData);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("*", (req, res) => {
  res.send("404 - Page does not exist");
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Movie App has started");
});
