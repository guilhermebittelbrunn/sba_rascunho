import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export default function Header() {
    const {count} = useContext(MainContext);
  
    return (
        <>
            <div>Header</div>    
            <h3>{count}</h3>
        </>
    )
}
