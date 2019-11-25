var express = require("express");
var app = express();
var rp = require("request-promise");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  var search = req.query.search;
  var url = `http://www.omdbapi.com/?s=${search}&apikey=thewdb`;
  rp(url)
    .then(body => {
      var data = JSON.parse(body);
      res.render("results", { data: data });
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
