import React from 'react';
import ReactDOM from 'react-dom/client';
import { NavBar } from './App';
import { ProductsContainer } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const links = [
    {
        nome: 'Products',
        url: './Products',
    },
    {
        nome: 'About',
        url: './About',
    },
    {
        nome: 'Buy',
        url: './Buy',
    },
];

const produtos = [
    {
        nome: 'Leite',
        preco: 5.0,
        status: {
            ativo: true,
            estoque: false,
        },
    },
    {
        nome: 'Coca-cola',
        preco: 9.0,
        status: {
            ativo: true,
            estoque: true,
        },
    },
    {
        nome: 'Chocolate',
        preco: 4.0,
        status: {
            ativo: false,
            estoque: true,
        },
    },
    {
        nome: 'Pastel',
        preco: 7.0,
        status: {
            ativo: false,
            estoque: false,
        },
    },
];

function Application() {
    return (
        <>
            <NavBar nome="FakeStore" links={links} />
            <ProductsContainer produtos={produtos} />
        </>
    );
}

root.render(<Application />);
