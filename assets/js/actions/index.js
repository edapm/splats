import { post } from '../utils.js'

export function setLeaders (leaders) {
    return {
        type: 'SET_LEADERS',
        leaders,
    }
}

export function votedForLeader () {
    return {
        type: 'VOTED_FOR_LEADER',
    }
}

export function voteForLeader (leader) {
    return dispatch => {
        // display confirmation immediately for better UX
        dispatch(votedForLeader())
        post('/api/vote', { leader })
    }
}

export function dialogCancelPressed () {
    return {
        type: 'DIALOG_CANCEL_PRESSED',
    }
}
