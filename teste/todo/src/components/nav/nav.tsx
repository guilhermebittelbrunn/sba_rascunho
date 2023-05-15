import Login from '../update/login'
import Register from '../update/register'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useState} from 'react';

export default function Nav(){
    const [register, setRegister]  = useState(false)
    const [login, setLogin]  = useState(false)
    return (
        <>
        <nav>
          <div className='register'>
            <button onClick={()=>{setRegister(true), setLogin(false)}}>Register</button>
          </div>
          <div className='login'>
            <button onClick={()=>{setRegister(false), setLogin(true)}}>Login</button>
          </div>
        </nav>

        <div className='container'>
          {register && <Register/>}
          {login && <Login/>}
        </div>
        </>
    )
}