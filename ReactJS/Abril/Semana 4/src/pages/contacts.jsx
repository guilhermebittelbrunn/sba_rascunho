import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const alumn_base = [
    {
        id: 1,
        nome: 'Guilherme',
        turma: '2A',
    },
];

let index = 7;

export default function Contact(){

    const data = JSON.parse(localStorage.getItem('alumns')) ?? alumn_base;



    const [alumns,setAlumns] = useState(data);
    const [info,setInfo] = useState({});

   
    useEffect(()=>{
         localStorage.setItem('alumns', JSON.stringify(alumns))
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