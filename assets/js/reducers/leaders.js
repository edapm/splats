export default function (state = [], action) {
    switch (action.type) {
    case 'SET_LEADERS':
        return action.leaders
    default:
        return state
    }
}
