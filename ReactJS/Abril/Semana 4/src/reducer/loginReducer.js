export default function loginReducer(state = 'logout', action) {
    switch (action.type) {
        case 'LOGIN':
            return (state = 'login');
        case 'LOGOUT':
            return (state = 'logout');
        default:
            return state;
    }
}
