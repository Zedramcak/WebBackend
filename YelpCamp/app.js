var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// * Schema setup
var campGroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campGroundSchema);

// ?Campground.create(
// ? {
// ?   name: "Mushroom Kingdom",
// ?    image:
// ?      "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
// ?  },
// ?  (err, campground) => {
// ?    if (err) {
// ?      console.log(err);
// ?    } else {
// ?      console.log("NEW CAMPGROUND ADDED");
// ?      console.log(campground);
// ?    }
// ?  }
// ?);

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: campgrounds });
    }
  });
  // *   res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image
  };
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("The YelpCamp server has started");
});
