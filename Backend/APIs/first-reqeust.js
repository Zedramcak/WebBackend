var request = require("request");

request("http://www.google.com", (error, response, body) => {
  if (error) {
    console.log("SOMETHING WENT WRONG!");
    console.log(error);
  } else {
    if (response.statusCode == 200) {
      console.log(body);
    }
  }
});
