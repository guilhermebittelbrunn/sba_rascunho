import { useContext } from "react";
import { CountContext } from "../contexts/CountContext";

export default function App(){
    const {count, setCount} = useContext(CountContext);

    return(       
        <button onClick={()=>{setCount(pv=>{return pv + 1})}}>
            {count}
        </button>
    )
}