import React from 'react';
import ReactDOM from 'react-dom/client';
import { NavBar } from './App';
import { ProductsContainer } from './App';
import { SectionContainer } from './App';
import { Timer } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const text = `

em ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
tempor incididunt ut labore et dolore magna aliqua. Neque egestas congue quisque egestas 
diam in. Vestibulum lectus mauris ultrices eros in cursus. Mollis nunc sed id semper risus.
Id interdum velit laoreet id donec ultrices tincidunt arcu. 
Enim eu turpis egestas pretiumenean pharetra. Tristique senectus et netus 
et malesuada. Orci nulla pellentesque dignissim
enim. Egest
`;

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
    {
        nome: 'Contact',
        url: './Contact/Admin',
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
            <SectionContainer value="about" text={text} />
            <SectionContainer value="more" text={text} />
            <SectionContainer value="info" text={text} />
            <Timer />
        </>
    );
}

root.render(<Application />);
