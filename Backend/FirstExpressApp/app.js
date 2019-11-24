var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.get("/bye", function(req, res) {
  res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
  console.log("Someone made a request");
  res.send("WOOF!");
});

app.get("/new/:newName", function(req, res) {
  var subSite = req.params.newName;

  res.send("WELCOME TO THE " + subSite.toUpperCase() + " SUBSITE");
});

app.get("/new/:newName/comments/:id/:title", function(req, res) {
  console.log(req.params);
  res.send("THIS IS A COMMENT SECTION FOR " + req.params.title.toUpperCase());
});

app.get("*", function(req, res) {
  res.send("404 - site does not exists");
});

app.listen(3000, process.env.IP, function() {
  console.log("Server has started");
});
