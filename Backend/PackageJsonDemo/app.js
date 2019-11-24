var express = require("express");
var app = express();

app.get("/", (req, res)=>{
    res.send("HELLOOOOOOOOO");
} )

app.listen(3030, process.env.IP, () => {
    console.log("SERVER IS WORKING");
    console.log("I changed something");
    
})
