const fs = require("fs");

const LEADERS_DB_PATH = "./data/leaders.json";
const VOTES_DB_PATH = "./data/votes.json";
const IP_DB_PATH = "./data/ips.json";
const VOTES_PER_IP = 7;

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
    return readFile(LEADERS_DB_PATH).then(data => JSON.parse(data));
}

function getVotes() {
    return readFile(VOTES_DB_PATH).then(data => JSON.parse(data));
}

function isLeaderNameValid(name) {
    return getLeaders().then(leaders => leaders.map(leader => leader.name).includes(name));
}

function addVoteForLeader(name) {
    return getVotes().then(leaders => {
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
    });
}

function getIpVotes() {
    return readFile(IP_DB_PATH).then(data => JSON.parse(data));
}

function votesForIp(ip) {
    return getIpVotes().then(votes => {
        const voter = votes.find(entry => entry.name === ip);
        return voter ? voter.votes : 0;
    });
}

function isIpAllowedToVote(ip) {
    return votesForIp(ip).then(votes => votes < VOTES_PER_IP);
}

function addVoteForIp(name) {
    return getIpVotes().then(ips => {
        const voter = ips.find(ip => ip.name === name);
        if (voter) {
            voter.votes += 1;
        } else {
            ips.push({
                name,
                votes: 1,
            });
        }
        return writeFile(IP_DB_PATH, JSON.stringify(ips));
    });
}

module.exports = {
    getLeaders,
    addVoteForLeader,
    isLeaderNameValid,
    isIpAllowedToVote,
    addVoteForIp,
};
