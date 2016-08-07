export function setLeaders(leaders) {
    return {
        type: "SET_LEADERS",
        leaders,
    };
}

export function voteForLeader(leader) {
    return () => {
        console.log(`you voted for leader ${leader}`);
    };
}
