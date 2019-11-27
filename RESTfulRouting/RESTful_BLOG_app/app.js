var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful_blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//* MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image:
//     "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//   body:
//     "Hello everyone. This is a test blog. Sat with tempest and he but. Is truly or entreating nevermore bust the plainly hauntedtell on, word tapping spoken door then, lenore prophet my nothing velvet as said. Bleak cried."
// });

//* RESTFUL ROUTES
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("The Blog server has started");
});
