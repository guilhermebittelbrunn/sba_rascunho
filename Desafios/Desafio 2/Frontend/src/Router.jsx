import {Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import RouteContant from './components/RouteContant'
import About from './pages/about';
import Products from './pages/products';
import Login from './pages/login';
import Product from './pages/newProduct'
import Register from './pages/register'

export default function Router({colorBgContainer}){
    const [alert,setAlert] = useState({status: false, message: '', type: ''})


    function handleAlert(status, message, type){
      setAlert({
        status, message, type
      })
    }
    
    return(
      <>
           
              <Routes>
                <Route path='/about' element={<RouteContant title='About' element={<About/>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/products' element={<RouteContant title='Products' element={<Products/>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/product' element={<RouteContant title='Login' element={<Product/>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/login' element={<RouteContant alert={alert} title='Login' element={<Login/>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/register' element={<RouteContant alert={alert} title='Register' element={<Register handleAlert={handleAlert}/>} colorBgContainer={colorBgContainer} />}/>
              </Routes>
         
      </>
    )
}
   


