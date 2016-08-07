import { post } from "../utils.js";

export function setLeaders(leaders) {
    return {
        type: "SET_LEADERS",
        leaders,
    };
}

export function voteForLeader(leader) {
    return dispatch => {
        post("/api/vote", { leader }).then(() => {
            // dispatch({ type: "FOO FOO" });
        });
    };
}
