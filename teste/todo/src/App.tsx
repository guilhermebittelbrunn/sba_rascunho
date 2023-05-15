import Login from './components/update/login'
import Register from './components/update/register'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useState} from 'react';
import Nav from './components/nav/nav';

export default function App(){
 
  return (
    <>
      <Nav/>
      {/* <BrowserRouter> */}
        <h1> Hello World</h1>




        {/* <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/' element={<Login/>}></Route>
        </Routes> */}
      {/* </BrowserRouter> */}
    </>
  )
}