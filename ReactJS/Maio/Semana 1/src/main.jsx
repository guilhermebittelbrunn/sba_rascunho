import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Form from './components/Form'


function Application(){

    // try{
        
    // }finally{
    //     console.log(3);
    // }
 

    return(
        <>
            <BrowserRouter>
                <h3>Welcome</h3>
                <Routes>
                    <Route path='/new' element={<Form/>}/>
                    <Route path='/new/:id' element={<Form/>}/>
                    <Route path='/' element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Application />
  
)
