import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

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

export function ProductsButton() {
    let [count, setCount] = useState(0);

    function sum() {
        setCount((count += 1));
    }
    function sub() {
        setCount((count -= 1));
    }
    return (
        <>
            <br></br>
            <span>Itens: {count}</span>
            <br></br>
            <button onClick={sum}>+</button>
            <button onClick={sub}>-</button>
        </>
    );
}

export function ProductsContainer(prop) {
    const produtos = prop.produtos.map((produto, k) => {
        return (
            <li
                key={k}
                style={{
                    color: produto.preco > 5 ? 'red' : 'green',
                }}
            >
                {produto.nome} R${String(produto.preco).padEnd('4', ',00')}
                <ProductsButton />
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
    return (
        <>
            <details
                style={{
                    backgroundColor: '#2f2f2f',
                    width: '100%',
                    padding: '12px 0px',
                    margin: '4px 0px',
                    cursor: 'pointer',
                }}
            >
                <summary style={{ color: 'white', marginLeft: '12px' }}>{prop.title}</summary>
                <div style={{ width: '90%', margin: 'auto' }}>
                    <p>{prop.text}</p>
                </div>
            </details>
        </>
    );
}

export function Timer() {
    let [time, setTime] = useState(5);

    function changeTime() {
        time > 0 && setTime((time -= 1));
    }

    setInterval(() => {
        changeTime();
    }, 1000);

    let second = time % 60;
    let minute = Math.floor(time / 60);

    return (
        <>
            <h3>
                The current time is: {String(minute).padStart(2, '0')}:{String(second).padStart(2, '0')}
            </h3>
        </>
    );
}

export function ButtonIncrement() {
    let [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }
    return (
        <>
            <button onClick={increment}>Clicked {count} times!</button>
            <button onClick={increment}>Clicked {count} times!</button>
        </>
    );
}

export function ButtonIncrementStorage() {
    let [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }

    useEffect(() => {
        setCount((count = parseInt(localStorage.getItem('count'))));
    }, []);

    useEffect(() => {
        localStorage.setItem('count', count);
    }, [count]);

    return (
        <>
            <h4>Button Increment with LocalStorage count</h4>
            <button onClick={increment}>Clicked {count} times!</button>
        </>
    );
}
