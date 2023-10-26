import {useState, useEffect, ChangeEvent, useContext} from 'react'
import ContextProvider from './Context'
import Card from './Card'

export enum Period{
  'Matutino',
  'Vespertino',
  'Noturno'
}

export enum Status{
  'Aprovado',
  'Reprovado'
}

export interface Student{
  name:string,
  age:number,
  period:Period,
  status:Status,
}



const students:Student[] = [
  {
    name: 'Guilherme',
    age: 17,
    period: Period.Matutino,
    status: Status.Aprovado
  },
  {
    name: 'Jessica',
    age: 16,
    period: Period.Noturno,
    status: Status.Aprovado
  },
  {
    name: 'Roseli',
    age: 14,
    period: Period.Vespertino,
    status: Status.Aprovado
  },
  {
    name: 'Ivan',
    age: 18,
    period: Period.Noturno,
    status: Status.Reprovado
  },
  {
    name: 'Camilly',
    age: 19,
    period: Period.Matutino,
    status: Status.Reprovado
  },
  {
    name: 'Heloisa',
    age: 16,
    period: Period.Vespertino,
    status: Status.Aprovado
  },
  {
    name: 'Matheus',
    age: 17,
    period: Period.Matutino,
    status: Status.Aprovado
  },
]


function studentsByFilter<T extends keyof Student>(listStudents:Student[], filter:T){
  const newList = listStudents.reduce((acc:{[index:string]:Student[]}, student:Student)=>{
    if(acc[student[filter]] === undefined){
      acc[student[filter]] = [];
    }
    acc[student[filter]].push(student);
    return acc
  }, {})
  return newList
}


export default function App() {
  const [listStudents, setListStudents] = useState(students);

  

  function handleFilterClick<T extends keyof Student>(filter:T, value:Period | Status | number){
    const newList = studentsByFilter(students, filter);
    setListStudents(newList[value]);
  }

  function handleOrderClick<T extends keyof Student>(value:T){
    const newList = listStudents.sort((a,b)=>a.age - b.age);
    setListStudents([...newList]);
  }

  function handleChangeCheckboxAction(e:ChangeEvent<HTMLInputElement>){
    console.log(e.target.checked);
  }

  function handleTextAreaChangeValue(e:ChangeEvent<HTMLTextAreaElement>){
    console.log(e.target.value);
  }

  useEffect(()=>{
    (async()=>{
      console.log('1');
    })()

  },[listStudents])

  return (
    <ContextProvider>
      <h1>Hello World</h1>
      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
        {listStudents.map((e, key)=>{
        return(
          <Card e={e} key={key}/>
        )
      })}
      </div>
      <button onClick={()=>{handleFilterClick('period', Period.Matutino)}}>filter by Matutino</button>
      <button onClick={()=>{handleFilterClick('period', Period.Vespertino)}}>filter by Vespertino</button>
      <button onClick={()=>{handleFilterClick('period', Period.Noturno)}}>filter by Noturno</button>
      <hr />
        <button onClick={()=>{handleFilterClick('status', Status.Aprovado)}}>filter by Aprovado</button>
        <button onClick={()=>{handleFilterClick('status', Status.Reprovado)}}>filter by Reprovado</button>
      <hr />
        <button onClick={()=>{handleOrderClick('age')}}>Order by name</button>
        <button onClick={()=>{handleOrderClick('age')}}>Order by age</button>
      <hr/>
      <button onClick={()=>{setListStudents([...students])}}>All students</button>
      <hr>
      </hr>
      <input type="checkbox" onChange={handleChangeCheckboxAction}/>
      <textarea name="test" id="test" cols={30} rows={10} onChange={handleTextAreaChangeValue}/>
      <hr/>
      <button>incress value</button>
      <button>decress value</button>
    </ContextProvider>
  )
}



