import {useContext} from 'react'
import {MainContext} from '../context/MainContext'
import HeaderChildren from './HeaderChildren'

export default function Header(){
    const {count, setCount} = useContext(MainContext)
    
    return(
        <>
            <h2>Contagem atual: {count}</h2>
            <HeaderChildren setCount={setCount}/> 
        </>
    )
}