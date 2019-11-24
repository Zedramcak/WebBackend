var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/fallinlovewith/:thing", (req, res) => {
  var thing = req.params.thing;
  res.render("love", {
    thingVar: thing
  });
});

app.get("/posts", (req, res) => {
  var posts = [
    { title: "Post 1", author: "Karel" },
    { title: "This is a second post", author: "David" },
    { title: "another!!!!!!!", author: "Bob" }
  ];

  res.render("posts", { posts: posts });
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server has started");
});
