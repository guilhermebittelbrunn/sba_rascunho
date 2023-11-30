import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CountButton, CountButtonSyncron, ListaDeAlunos } from "./App";

const alunos = [
    {
        id: 1,
        nome: "Douglas",
        idade: 20,
        aprovado: true,
    },
    {
        id: 2,
        nome: "Matheus",
        idade: 20,
        aprovado: true,
    },
    {
        id: 3,
        nome: "Ricardo",
        idade: 20,
        aprovado: false,
    },
    {
        id: 4,
        nome: "Ana",
        idade: 20,
        aprovado: true,
    },
    {
        id: 5,
        nome: "Julia",
        idade: 20,
        aprovado: false,
    },
];
const produtos = [
    {
        nome: "Camiseta",
        preco: 20.0,
        colecao: "2A",
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: "Calça",
        preco: 20.0,
        colecao: "2A",
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: "Moletom",
        preco: 20.0,
        colecao: "2A",
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: "Jaqueta",
        preco: 20.0,
        colecao: "2A",
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: "Bolsa",
        preco: 20.0,
        colecao: "2A",
        status: {
            estoque: false,
            ativo: true,
        },
    },
    {
        nome: "Shorts",
        preco: 20.0,
        colecao: "2A",
        status: {
            estoque: false,
            ativo: true,
        },
    },
];

const lista_links = ["Home", "Products", "Contacts", "More"];

const root = ReactDOM.createRoot(document.getElementById("root"));

function Pai() {
    const [count, setCount] = useState(0);

    function incressValue() {
        console.log(count);
        setCount((prev) => {
            return prev + 1;
        });
    }

    return (
        <>
            <h1>Buttons</h1>
            <h3>Buttons desconhecidos</h3>
            <CountButton />
            <CountButton />
            <hr></hr>
            <h3>Buttons conhecidos pelo pai</h3>
            <CountButtonSyncron count={count} addCount={incressValue} />
            <CountButtonSyncron count={count} addCount={incressValue} />
            <hr></hr>
            <ListaDeAlunos alunos={alunos} listanome="alunos" />
        </>
    );
}

root.render(<Pai />);
