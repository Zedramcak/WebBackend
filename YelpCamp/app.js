var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  seedDB = require("./seeds"),
  Campground = require("./models/campground");
// Comment = require("./models/comment"),
// User = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

//* show all campgrounds
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: campgrounds });
    }
  });
  // *   res.render("campgrounds", { campgrounds: campgrounds });
});

//* add new campground to db
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description
  };
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//* create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

//* SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  //* find the campground with provided id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);

        res.render("show", { campground: foundCampground });
      }
    });
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("The YelpCamp server has started");
});
