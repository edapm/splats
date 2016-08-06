var express = require("express");
var app = express();
var leaders = require("../data/leaders.json");

app.use(express.static("static"));

app.get("/", function(req, res) {
    res.redirect("/vote.html");
});

app.get("/leaders", function(req, res) {
    res.send(leaders);
});

app.listen(3000, function() {
    console.log("Listening on port 3000!");
});
