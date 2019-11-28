var mongoose = require("mongoose");

//* USER - email, name, post
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});
module.exports = mongoose.model("User", userSchema);
