var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre"];

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/addfriend", (req, res) => {
  console.log(req.body);

  var newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

app.get("/friends", (req, res) => {
  res.render("friends", { friends: friends });
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server has started");
});
