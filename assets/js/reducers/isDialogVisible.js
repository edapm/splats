export default function (state = false, action) {
    switch (action.type) {
    case 'VOTED_FOR_LEADER':
        return true
    case 'DIALOG_CANCEL_PRESSED':
        return false
    default:
        return state
    }
}
