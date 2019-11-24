var express = require("express");
var app = express();

var noPage = "Sorry, page not found...What are you doing with your life?";

app.get("/", (req, res) => {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", (req, res) => {
  var sounds = {
    pig: "Oink",
    dog: "Woof",
    cat: "Meow",
    froq: "Rabbid",
    fox: "RINGI DINGI DING DING"
  };

  var animal = req.params.animal.toLowerCase();
  var sound = sounds[animal];

  if (!sound) {
    res.send(noPage);
    return;
  }

  res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:count", (req, res) => {
  var count = req.params.count;

  if (isNaN(count)) {
    res.send(noPage);
    return;
  }
  if (count > 100000) {
    res.send("ARE YOU OUT OF YOUR MIND???????");
    return;
  }

  var string = "";
  for (let i = 0; i < count; i++) {
    string += req.params.word + " ";
  }

  res.send(string);
});

app.get("*", (req, res) => {
  res.send(noPage);
});

app.listen(3000, process.env.IP, () => {
  console.log("Server has started");
});
