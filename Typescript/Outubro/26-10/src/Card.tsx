import { Student, Period, Status } from './App'
import { Context, IContextProps } from './Context'
import { useContext } from 'react'

type Props = {
    e: Student
}

const Card = ({e}:Props) => {
  const {setCount} = useContext(Context);
  
  
  return (
    <div style={{width: '240px', border: '1px solid black', textAlign: 'center'}}>
            <h1>{e.name} - {e.age}</h1>
            <h2>{Period[e.period]}</h2>
            <h1 style={{color: Status[e.status] === "Aprovado" ? "red" : "green"}}>
                {Status[e.status]}
            </h1>
          </div>
  )
}

export default Card

