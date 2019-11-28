var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/association_demo_2", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var Post = require("./models/post");
var User = require("./models/user");

/* User.findOne({ email: "bob@gmail.com" })
  .populate("post")
  .exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  }); */

Post.create(
  {
    title: "How to cook the best burger pt.3",
    content: "fdjuihabuiojwhrohnaoiufnouiasnf"
  },
  (err, post) => {
    User.findOne({ email: "bob@gmail.com" }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        foundUser.post.push(post);
        foundUser.save((err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
);

/*
 *User.create(
 *{
 *    email: "bob@gmail.com",
 *    name: "Bob Burger"
 *  },
 *  (err, user) => {
 *    if (err) {
 *      console.log(err);
 *    } else {
 *      console.log(user);
 *    }
 *  }
 *);
 */
