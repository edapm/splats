var express = require("express");
var app = express();

app.use(express.static("static"));

app.get("/", function(req, res) {
    res.redirect("/vote.html");
});

app.listen(3000, function() {
    console.log("Listening on port 3000!");
});
