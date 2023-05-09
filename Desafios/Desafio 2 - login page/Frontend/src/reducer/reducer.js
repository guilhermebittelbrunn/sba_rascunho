export default function reducer(login = { status: false, user: false }, action) {
    switch (action.type) {
        case 'LOGIN':
            return (login = { status: 'true', user: action.payload });
        case 'LOGOUT':
            return (login = { status: false, user: false });
        default:
            return login;
    }
}
