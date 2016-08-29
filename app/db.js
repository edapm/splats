const fs = require("fs");

const LEADERS_DB_PATH = "./data/leaders.json";
const VOTES_DB_PATH = "./data/votes.json";
const IP_DB_PATH = "./data/ips.json";
const VOTES_PER_IP = 7;
const COUNT_IPS_PATH = "./data/count_ips.json";

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

function resetVotes() {
    return writeFile(VOTES_DB_PATH, "[]")
    .then(() => {
        writeFile(IP_DB_PATH, "[]");
    });
}

function shouldCountIps() {
    return readFile(COUNT_IPS_PATH).then(data => JSON.parse(data).count);
}

function setShouldCountIps(shouldCount) {
    const result = { count: shouldCount };
    return writeFile(COUNT_IPS_PATH, JSON.stringify(result))
    .then(() => shouldCountIps());
}

function isIpAllowedToVote(ip) {
    return Promise.all([votesForIp(ip), shouldCountIps()])
    .then(([votes, shouldCount]) => ((votes < VOTES_PER_IP) || !shouldCount));
}

module.exports = {
    getLeaders,
    getVotes,
    addVoteForLeader,
    isLeaderNameValid,
    isIpAllowedToVote,
    addVoteForIp,
    resetVotes,
    shouldCountIps,
    setShouldCountIps,
};
