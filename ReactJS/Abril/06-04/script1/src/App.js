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
    return (
        <>
            {prop.alunos.map((aluno) => {
                return <li>{aluno.nome}</li>;
            })}
        </>
    );
}

function ListaDeAlunos(prop) {
    return (
        <section>
            <h3>Lista de {prop.listanome}:</h3>
            <ul>
                <Alunos alunos={prop.alunos} />
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

// fetch('https://economia.awesomeapi.com.br/last/USD')
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//     });

fetch('https://cdn.apicep.com/file/apicep/06233-030.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
    });

export default Application;
