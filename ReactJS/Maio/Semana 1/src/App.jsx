import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
    
          <h2>Home page</h2>
          <h3>state clicked {count} times</h3>
          <button onClick={()=>{setCount(preventValue=>preventValue + 1)}}>Increment state</button>
          <br></br>
          <Link to={'/new'}>Criar</Link>
          <Link to={`/new/${count}`}>Editar</Link>
  
    </>
  )
}

export default App
