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
router.post("/", isLoggedIn, (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author
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
router.get("/new", isLoggedIn, (req, res) => {
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

//* EDIT CAMPGROUND ROUTE
router.get("/:id/edit", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

//* UPDATE CAMPGROUND ROUTE
router.put("/:id", (req, res) => {
  //* find and update
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
  //*redirect to show page
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
