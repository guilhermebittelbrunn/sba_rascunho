function NavBar(props) {
    const navStyle = {
        backgroundColor: '#2f2f2f',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '12px 12px',
        color: 'white',
    };

    const ulStyle = {
        display: 'flex',
        gap: '16px',
        listStyle: 'none',
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
                    >
                        Add
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
