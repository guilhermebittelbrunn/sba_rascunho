import { useEffect, useState, useRef, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import axios from 'axios';

function App() {
  const ref = useRef();
  const [count, setCount] = useState(0);
  const [pokemons, setPokemons] = useState([]); 
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    // setLoading(true);
    // (async()=>{
    //   for(let i = 1; i < 100; i++){
    //     const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    //     setPokemons(preventValue => [...preventValue, data]);
    //   }
    //   setLoading(false)
    // })()
  },[])

  return (
    <>
    
          <h2 ref={ref}>Home page</h2>
          <h3>state clicked {count} times</h3>
          <button onClick={()=>{setCount(preventValue=>preventValue + 1, ref.current.style = 'display: none')}}>Increment state</button>
          <br></br>
          <Link to={'/new'}>Criar</Link>
          <Link to={`/new/${count}`}>Editar</Link>
          {/* {!loading ? pokemons.map((pokemon, k) => <p key={k}>{pokemon.name}</p>) : <h4>Carregando...</h4>} */}
    </>
  )
}

export default App
