import {Routes, Route } from 'react-router-dom';
import RouteContant from './components/RouteContant'
import About from './pages/about';
import Products from './pages/products';


export default function Router({colorBgContainer}){
    return(
      <>
           
              <Routes>
                <Route path='/about' element={<RouteContant title='About' element={<About/>} colorBgContainer={colorBgContainer}/>}/>
                <Route path='/products' element={<RouteContant title='Products' element={<Products/>} colorBgContainer={colorBgContainer}/>}/>
              </Routes>
         
      </>
    )
}
           