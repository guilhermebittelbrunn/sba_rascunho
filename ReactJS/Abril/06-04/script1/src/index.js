import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const alunos = [
    {
        nome: 'Douglas',
        idade: 20,
        aprovado: true,
    },
    {
        nome: 'Matheus',
        idade: 20,
        aprovado: true,
    },
    {
        nome: 'Ricardo',
        idade: 20,
        aprovado: false,
    },
    {
        nome: 'Ana',
        idade: 20,
        aprovado: true,
    },
    {
        nome: 'Julia',
        idade: 20,
        aprovado: false,
    },
];
const produtos = [
    {
        nome: 'Camiseta',
        preco: 20.0,
        colecao: '2A',
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: 'Calça',
        preco: 20.0,
        colecao: '2A',
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: 'Moletom',
        preco: 20.0,
        colecao: '2A',
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: 'Jaqueta',
        preco: 20.0,
        colecao: '2A',
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: 'Bolsa',
        preco: 20.0,
        colecao: '2A',
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: 'Shorts',
        preco: 20.0,
        colecao: '2A',
        status: {
            estoque: false,
            ativo: true,
        },
    },
];

const lista_links = ['Home', 'Products', 'Contacts', 'More'];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App nome="FakeStore" links={lista_links} alunos={alunos} produtos={produtos} />);
