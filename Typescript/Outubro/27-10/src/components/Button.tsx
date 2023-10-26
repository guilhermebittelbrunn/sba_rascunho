import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export default function Button(){
    const {count, setCount} = useContext(MainContext)
  
    return (
    <>
        <button onClick={()=>{setCount(count + 1)}}>incress value</button>
        <button onClick={()=>{setCount(count - 1)}}>decress value</button>
    </>
  )
}

