export default function (state = [], action) {
    switch (action.type) {
    case 'SET_LEADERS':
        return [...action.leaders].sort((a, b) =>
            a.name.localeCompare(b.name)
        )
    default:
        return state
    }
}
