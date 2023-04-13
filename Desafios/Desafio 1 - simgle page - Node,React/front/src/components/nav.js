function NavBar(props) {
    const navStyle = {
        backgroundColor: '#2f2f2f',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '12px 12px',
        color: 'white',
        fontSize: '24px',
        zIndex: '10',
    };

    const ulStyle = {
        display: 'flex',
        gap: '16px',
        listStyle: 'none',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const buttonStyle = {
        backgroundColor: 'whitesmoke',
        color: '#2f2f2f',
        fontSize: '16px',
        width: '100px',
        padding: '6px 24px',
        border: 'none',
        textTransform: 'uppercase',
        fontWeight: 'bolder',
        borderRadius: '12px',
    };

    return (
        <nav style={navStyle}>
            <h3>{props.title}</h3>
            <ul style={ulStyle}>
                {props.links.map((link, k) => (
                    <li key={k}>{link}</li>
                ))}
                <li>
                    <button
                        onClick={() => {
                            props.changeState(true, 'Adicionar produto');
                        }}
                        style={buttonStyle}
                    >
                        Add
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
