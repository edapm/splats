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
    return new Promise((resolve, reject) => {
        readFile(LEADERS_DB_PATH)
        .then(data => resolve(JSON.parse(data)))
        .catch(err => reject(err));
    });
}

function getVotes() {
    return new Promise((resolve, reject) => {
        readFile(VOTES_DB_PATH)
        .then(data => resolve(JSON.parse(data)))
        .catch(err => reject(err));
    });
}

function isLeaderNameValid(name) {
    return new Promise((resolve, reject) => {
        getLeaders()
        .then(leaders => {
            resolve(leaders.map(leader => leader.name).includes(name));
        })
        .catch(err => reject(err));
    });
}

function addVoteForLeader(name) {
    return new Promise((resolve, reject) => {
        getVotes()
        .then(leaders => {
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
        })
        .then(() => resolve())
        .catch(err => reject(err));
    });
}

module.exports = {
    getLeaders,
    addVoteForLeader,
    isLeaderNameValid,
};
