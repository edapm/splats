const fs = require("fs");

const LEADERS_DB_PATH = "./data/leaders.json";
const VOTES_DB_PATH = "./data/votes.json";

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function getLeaders() {
    return new Promise((resolve) => {
        readFile(LEADERS_DB_PATH)
        .then(data => resolve(JSON.parse(data)));
    });
}

function getVotes() {
    return new Promise((resolve) => {
        readFile(VOTES_DB_PATH)
        .then(data => resolve(JSON.parse(data)));
    });
}

function addVoteForLeader(name) {
    return new Promise((resolve) => {
        getVotes().then(leaders => {
            const victim = leaders.find(leader => leader.name === name);
            if (victim) {
                victim.votes += 1;
            } else {
                leaders.push({
                    name,
                    votes: 1,
                });
            }
            return writeFile(VOTES_DB_PATH, JSON.stringify(leaders));
        }).then(() => {
            resolve();
        });
    });
}

module.exports = {
    getLeaders,
    addVoteForLeader,
};
