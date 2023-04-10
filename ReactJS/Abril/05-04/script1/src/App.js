import './App.css';

export function NavBar(prop) {
    const links = prop.links.map((link) => {
        return (
            <li>
                <a
                    href={link.url}
                    style={{
                        color: 'White',
                        textDecoration: 'none',
                    }}
                >
                    {link.nome}
                </a>
            </li>
        );
    });
    return (
        <>
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
                <h3>{prop.nome}</h3>
                <ul
                    style={{
                        display: 'flex',
                        listStyle: 'none',
                        gap: '8px',
                    }}
                >
                    {links}
                </ul>
            </nav>
        </>
    );
}

export function ProductsContainer(prop) {
    const produtos = prop.produtos.map((produto, k) => {
        return (
            <>
                <li key={k} id={k}>
                    {produto.nome} R${produto.preco}
                </li>
            </>
        );
    });
    return (
        <>
            <section>
                <ul>{produtos}</ul>
            </section>
        </>
    );
}
