import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import axios from 'axios';
import useFetch from '../hooks/useFetch';

function App() {
  const ref = useRef();
  const [count, setCount] = useState(0);
  const {data, loading, error} = useFetch('https://pokeapi.co/api/v2/pokemon/111')



  


  return (
    <>
    
          <h2 ref={ref}>Home page</h2>
          <h3>state clicked {count} times</h3>
          <button onClick={()=>{setCount(preventValue=>preventValue + 1, ref.current.style = 'display: none')}}>Increment state</button>
          <br></br>
          <Link to={'/new'}>Criar</Link>
          <Link to={`/new/${count}`}>Editar</Link>
          <br></br>
          {/* <input type='text'></input> */}
          <button onClick={()=>{
            useFetch(``)
          }}>Buscar</button>
          <br></br>
          <span>Lista:</span>
          {loading ? 
          <h3>Carregando...</h3>
          :
            error? 
            <h3>Erro ao carregar os itens</h3> 
            :
            <ul>
              <li>{JSON.stringify(data)}</li>   
            </ul>
          }
          
            
          {/* {!loading ? pokemons.map((pokemon, k) => <p key={k}>{pokemon.name}</p>) : <h4>Carregando...</h4>} */}
    </>
  )
}

export default App

