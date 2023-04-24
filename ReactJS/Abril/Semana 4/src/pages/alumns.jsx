import { useParams,Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import useURL from "../hooks/useURL";
import NotFound from "../components/NotFound";


export default function Alumn(){

    const data = JSON.parse(localStorage.getItem('alumns'));

    const param = useParams();
    const data_alumns = data.filter(alumn=>{if(alumn.id == param.id)return alumn});
    const nextId = data.length - param.id;
    const url = useURL(param.id);

    return (
        (nextId >= 0 &&
        <>
            <section>
                <h1>Page of {data_alumns[0].nome} #{data_alumns[0].id}</h1>
                <h3>Turma: {data_alumns[0].turma}</h3>
                {nextId != data.length - 1 && <Link to={`${url}${param.id - 1}`}>⬅Previus page</Link>}
                {nextId >= 1 && <Link to={`${url}${+param.id + 1}`}>Next page➡</Link>}
            </section>
        </>) 
        || 
        (<NotFound/>)
    )
}