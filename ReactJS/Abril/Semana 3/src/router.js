import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function RouterApp() {
    return (
        <>
            <BrowserRouter>
                <Nav />
                <Route path="/">
                    <About />
                </Route>
                <Route path="/products">
                    <Products />
                </Route>
                <Footer />
            </BrowserRouter>
        </>
    );
}

function Nav() {
    return (
        <nav>
            <h3>Logo</h3>
            <ul>
                <li>
                    <a>About</a>
                </li>
                <li>
                    <a>Products</a>
                </li>
            </ul>
        </nav>
    );
}

function Footer() {
    return (
        <footer>
            <p>Footer section</p>
        </footer>
    );
}

function About() {
    return (
        <>
            <h3>About out team</h3>
            <p>Lorem iapsdaisdiada</p>
        </>
    );
}

function Products() {
    const produtos = [
        {
            title: 'titulo',
            description: 'descricao',
            price: 'preco',
            inUse: true,
        },
    ];
    return (
        <div>
            <ul>
                {produtos.map((item) => {
                    return <li>{JSON.stringify(item)}</li>;
                })}
            </ul>
        </div>
    );
}
