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
    const ip = req.ip;
    db.isIpAllowedToVote(ip).then(allowed => {
        if (allowed) {
            db.isLeaderNameValid(leaderName).then(valid => {
                if (valid) {
                    db.addVoteForLeader(leaderName)
                    .then(() => db.addVoteForIp(ip))
                    .then(() => {
                        res.status(204);
                        res.send();
                    })
                    .catch(() => {
                        res.status(500);
                        res.send("Server error");
                    });
                } else {
                    res.status(400);
                    res.send("Bad leader name");
                }
            });
        } else {
            res.status(403);
            res.send("You have used all your votes for today!");
        }
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});
