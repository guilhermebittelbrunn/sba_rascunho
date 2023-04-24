import { useLocation } from "react-router-dom"

export default function useURL(param){
    return(
        useLocation().pathname.replace(`alunos/${param}`, 'alunos/')
    )
}