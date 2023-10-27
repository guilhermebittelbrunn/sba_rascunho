import {useContext, ChangeEvent} from 'react'
import {MainContext} from '../context/MainContext'


export default function Button(){
  const {setCount} = useContext(MainContext)
  
  function handleChangeInputValue(e:ChangeEvent<HTMLInputElement>){
    const value:number = +e.target.value  
    if(!Number.isNaN(value)){
      setCount(value);
    }
  }

  return(
    <>
      <button onClick={()=>{setCount((pv)=>pv + 1)}}>incress value</button>
      <button onClick={()=>{setCount((pv)=>pv - 1)}}>decress value</button>
      <input type="number" onChange={handleChangeInputValue}/>
    </>
  )
}