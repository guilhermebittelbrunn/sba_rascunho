import './App.css';
import { useState } from 'react';

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
    let [count, setCount] = useState(0);

    function sum() {
        setCount((count += 1));
    }
    function sub() {
        setCount((count -= 1));
    }

    const produtos = prop.produtos.map((produto, k) => {
        return (
            <li key={k} id={k}>
                {produto.nome} R${produto.preco}
                <br></br>
                <span>Itens: {count}</span>
                <br></br>
                <button onClick={sum}>+</button>
                <button onClick={sub}>-</button>
            </li>
        );
    });
    return (
        <>
            <section>
                <h2>Lista de produtos:</h2>
                <ul>{produtos}</ul>
            </section>
        </>
    );
}

export function SectionContainer(prop) {
    const content = document.getElementById(prop.value);
    let [state, setState] = useState(false);

    function showContent() {
        setState(!state);
        if (state) {
            return (content.innerHTML += `${String(prop.text)}`);
        }
        return (content.innerHTML = '');
    }

    return (
        <>
            <section
                style={{
                    backgroundColor: '#2f2f2f',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '6px 0px',
                }}
            >
                <h3>{prop.value}</h3>
                <button onClick={showContent}>+</button>
            </section>
            <div id={prop.value}></div>
        </>
    );
}

export function Timer() {
    let [time, setTime] = useState(70);

    function incressTime() {
        setTime((time -= 1));
    }

    let interval = setInterval(incressTime, 1000);

    let second = time % 60;
    let minute = Math.floor(time / 60);

    return (
        <>
            <h3 onLoad={interval}>
                The current time is: {String(minute).padStart(2, '0')}:{String(second).padStart(2, '0')}
            </h3>
        </>
    );
}
