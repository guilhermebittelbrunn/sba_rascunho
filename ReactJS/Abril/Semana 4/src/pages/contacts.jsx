import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// const data = [
//     {
//         id: 1,
//         nome: 'Guilherme',
//         turma: '2A',
//     },
//     {
//         id: 2,
//         nome: 'Jessica',
//         turma: '2B',
//     },
//     {
//         id: 3,
//         nome: 'Roseli',
//         turma: '1A',
//     },
//     {
//         id: 4,
//         nome: 'Ivan',
//         turma: '1B',
//     },
//     {
//         id: 5,
//         nome: 'Camilly',
//         turma: '3A',
//     },
//     {
//         id: 6,
//         nome: 'Heloisa',
//         turma: '3B',
//     },
//     {
//         id: 7,
//         nome: 'Matheus',
//         turma: '4A',
//     },
// ];

let index = 7;

export default function Contact(){

    const data = JSON.parse(localStorage.getItem('alumns'));

  
    const [alumns,setAlumns] = useState(data);
    const [info,setInfo] = useState({});

   
    useEffect(()=>{
        localStorage.setItem('alumns', JSON.stringify(alumns));
    }, [alumns])

    function addAlumn(e){
        e.preventDefault();
        
        setAlumns(()=>{
            return [...alumns, {...info, ['id']: alumns.length + 1}]
        })
        console.log(alumns.length);
      
    }
    function handleChange(e){
        setInfo(preventValue =>{
            return {...preventValue, [e.target.placeholder]: e.target.value};
        })
    }
    

    return(
        <>
            <form>
                <h3>Inserir aluno</h3>
                <input type="text" placeholder="nome" onChange={handleChange}/>
                <input type="text" placeholder="turma" onChange={handleChange}/>
                <button onClick={addAlumn}>Adicionar</button>
            </form>
            <section>
                <h1>Contacts</h1>
                <ul>
                    {alumns.map((alumn)=>{return <li key={alumn.id}><Link to={`alunos/${alumn.id}`} teste='teste'>{`${alumn.nome} page`}</Link></li>})}
                </ul>
            </section>
        </>
    )
}