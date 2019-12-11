var express = require("express");
var router = (express = express.Router());
var Campground = require("../models/campground");

//* show all campgrounds
router.get("/", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  });
  // *   res.render("campgrounds", { campgrounds: campgrounds });
});

//* add new campground to db
router.post("/", (req, res) => {
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
router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

//* SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
  //* find the campground with provided id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

module.exports = router;
