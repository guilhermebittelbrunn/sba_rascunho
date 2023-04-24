import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import Home from './pages/home'
import About from './pages/about'
import Products from './pages/products'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Teste from './components/NotFound'
import Globalstyled from './styles/grobal_style'
import Contacts from './pages/contacts'
import Alumn from './pages/alumns'
import PrivateRoute from './priveteRoute'

import loginReducer from './reducer/loginReducer'
import { createStore } from 'redux'
import {Provider} from 'react-redux'

const store = createStore(loginReducer);

function Application(){
 
  return(
    <>
      {/* <Globalstyled> */}
          <Provider store={store}>

          <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/about' element={<About/>}/>
              <PrivateRoute path="contacts">
                  <Route path='/contacts' element={<Contacts/>}/>
                  <Route path='/contacts/alunos/:id' element={<Alumn/>}/>
              </PrivateRoute>
  
         
              <Route path='/products' element={<Products/>}/>
              <Route path='/products/:id' element={<Products/>}/>
              <Route path='*' element={<Teste/>}/>
            </Routes>
          </BrowserRouter>
          <Footer/>
          </Provider>
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


