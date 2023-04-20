import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/home'
import About from './pages/about'
import Products from './pages/products'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Globalstyled from './styles/grobal_style'

function Application(){
 
  return(
    <>
      {/* <Globalstyled> */}
          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='*' element={<Error404/>}/>
            </Routes>
          </BrowserRouter>
          <Footer/>
      {/* </Globalstyled> */}
    </>
  )
}

function Error404(){
  return (
    <>
      <h1>Error 404 - Page not found</h1>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Application/>)


