const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// george.save((err, cat) => {
//   if (err) {
//     console.log("Something went wrong");
//   } else {
//     console.log("CAT ADDED TO DATABASE");
//     console.log(george);
//   }
// });

Cat.create(
  {
    name: "Snow White",
    age: 15,
    temperament: "Bland"
  },
  (err, cat) => {
    if (err) {
      console.log(err);
    } else {
      console.log(cat);
    }
  }
);

Cat.find({}, (err, cats) => {
  if (err) {
    console.log("OH NO!");
    console.log(err);
  } else {
    console.log("ALL THE CATS");
    console.log(cats);
  }
});
