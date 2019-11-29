var express = require("express");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/secret", (req, res) => {
  res.render("secret");
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server has started");
});
