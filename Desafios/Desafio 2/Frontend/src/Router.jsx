import {Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import RouteContant from './components/RouteContant'
import PrivateRoute from './components/PrivateRoute';
import About from './pages/about';
import Products from './pages/products';
import Login from './pages/login';
import Product from './pages/newProduct'
import Register from './pages/register'

export default function Router({colorBgContainer}){
    const [alert,setAlert] = useState({status: false, message: 'Success', type:'success', close: true});


    function handleAlert(status, message, type, close){
      setAlert({
        status, message, type, close
      })
      setTimeout(()=>{
        setAlert(false, '', '', false);
      }, 2000)
    }
    
    return(
      <>
              <Routes>
                <Route path='/about' element={<RouteContant alert={alert} title='About' element={<About alert={alert} handleAlert={handleAlert}/>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/products' element={<RouteContant alert={alert} title='Products' description="Click on a row to edit" element={<PrivateRoute><Products alert={alert} handleAlert={handleAlert}/></PrivateRoute>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/product' element={<RouteContant alert={alert} title='New Product' element={<PrivateRoute><Product alert={alert} handleAlert={handleAlert}/></PrivateRoute>} colorBgContainer={colorBgContainer}/>}/>  
                <Route path='/login' element={<RouteContant alert={alert} title='Login' element={<Login handleAlert={handleAlert}/>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/register' element={<RouteContant alert={alert} title='Register' element={<Register handleAlert={handleAlert}/>} colorBgContainer={colorBgContainer} />}/>
                <Route path='/' element={<RouteContant alert={alert} title='About' element={<About alert={alert} handleAlert={handleAlert}/>} colorBgContainer={colorBgContainer}/>}/>
              </Routes>
      </>
    )
}
   


