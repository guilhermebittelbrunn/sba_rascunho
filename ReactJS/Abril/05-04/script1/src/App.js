import './App.css';

const marca = {
    nome: 'MarketPlace',
};

function Message() {
    return (
        <nav
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px',
                backgroundColor: '#2f2f2f',
                color: 'white',
            }}
        >
            <h3>{marca.nome}</h3>
            <ul
                style={{
                    display: 'flex',
                    listStyle: 'none',
                    gap: '8px',
                }}
            >
                <li>Home</li>
                <li>Products</li>
                <li>About</li>
                <li>Contacts</li>
            </ul>
        </nav>
    );
}

export default Message;
