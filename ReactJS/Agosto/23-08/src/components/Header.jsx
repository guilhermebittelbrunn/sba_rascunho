import { useContext } from "react";
import {CountContext} from '../contexts/CountContext'

export default function Header(){
    const {count} = useContext(CountContext)
    
    return(
        <h3>Current count: {count}</h3>
    )
}