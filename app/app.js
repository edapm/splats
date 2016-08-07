const express = require("express");
const db = require("./db");

const app = express();
app.use(express.static("static"));

app.get("/", (req, res) => {
    res.redirect("/vote.html");
});

app.get("/leaders", (req, res) => {
    db.getLeaders().then((leaders) => res.send(leaders));
});

app.post("/vote", (req, res) => {
    const leaderName = req.query.leader;
    db.isLeaderNameValid(leaderName).then(valid => {
        if (valid) {
            db.addVoteForLeader(leaderName).then(() => {
                res.status(204);
                res.send();
            }).catch(err => {
                res.status(500);
                res.send(err);
            });
        } else {
            res.status(400);
            res.send("Bad leader name");
        }
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});
