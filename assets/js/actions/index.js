import { post } from "../utils.js";

export function setLeaders(leaders) {
    return {
        type: "SET_LEADERS",
        leaders,
    };
}

export function votedForLeader() {
    return {
        type: "VOTED_FOR_LEADER",
    };
}

export function voteForLeader(leader) {
    return dispatch => {
        post("/api/vote", { leader }).then(() => {
            dispatch(votedForLeader());
        });
    };
}

export function dialogCancelPressed() {
    return {
        type: "DIALOG_CANCEL_PRESSED",
    };
}
