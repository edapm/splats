const express = require("express");
const leaders = require("../data/leaders.json");

const app = express();
app.use(express.static("static"));

app.get("/", (req, res) => {
    res.redirect("/vote.html");
});

app.get("/leaders", (req, res) => {
    res.send(leaders);
});

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});
