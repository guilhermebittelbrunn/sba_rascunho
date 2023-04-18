import { useState } from 'react';
import './App.css';

function Links(prop) {
    return (
        <>
            {prop.links.map((link) => {
                return <li>{link}</li>;
            })}
        </>
    );
}

function NavBar(prop) {
    return (
        <nav
            className="NavBar"
            style={{
                backgroundColor: '#2f2f2f',
                color: 'whitesmoke',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <h2>{prop.nome}</h2>
            <ul
                style={{
                    display: 'flex',
                    gap: '12px',
                    listStyle: 'none',
                }}
            >
                <Links links={prop.links} />
            </ul>
        </nav>
    );
}

function Alunos(prop) {
    function returnAluno(aluno) {
        prop.removerAluno(aluno);
    }

    return (
        <>
            {prop.alunos.map((aluno, k) => {
                return (
                    <li key={k}>
                        {aluno.nome}
                        <button onClick={() => returnAluno(aluno)}>❌</button>
                    </li>
                );
            })}
        </>
    );
}

export function ListaDeAlunos(prop) {
    const [listAlumns, setListAlumns] = useState(prop.alunos);

    let removerAluno = (aluno) => {
        let newList = listAlumns.filter((aln) => {
            if (aln.id != aluno.id) {
                return aln;
            }
        });
        setListAlumns(newList);
    };

    return (
        <section>
            <h3>Lista de {prop.listanome}:</h3>
            <ul>
                <Alunos alunos={listAlumns} removerAluno={removerAluno} />
            </ul>
        </section>
    );
}

function Application(prop) {
    return (
        <>
            <NavBar nome={prop.nome} links={prop.links} />
            <section>
                <ListaDeAlunos alunos={prop.alunos} listanome="alunos" />
                <ListaDeAlunos alunos={prop.produtos} listanome="produtos" />
            </section>
        </>
    );
}
export function CountButton() {
    const [count, setCount] = useState(0);

    function addCount() {
        setCount(count + 1);
    }

    return (
        <>
            <button onClick={addCount}>Clicked {count} times!</button>
            <br></br>
            <br></br>
        </>
    );
}

export function CountButtonSyncron(prop) {
    return (
        <>
            <button onClick={prop.addCount}>Clicked {prop.count} times</button>
            <br></br>
            <br></br>
        </>
    );
}

export default CountButton;
