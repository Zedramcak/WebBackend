const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user"),
  app = express();

mongoose.connect("mongodb://localhost/auth_demo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(
  require("express-session")({
    secret: "The answer is 42",
    resave: false,
    saveUninitialized: false
  })
);

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//* =============
//* ROUTES
//* =============

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/secret", (req, res) => {
  res.render("secret");
});

//* Auth Routes
//* Show form
app.get("/register", (req, res) => {
  res.render("register");
});

//* handling user sign up
app.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.pass,
    (err, user) => {
      if (err) {
        console.log(err);
        res.render("register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.render("secret");
        });
      }
    }
  );
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server has started");
});
