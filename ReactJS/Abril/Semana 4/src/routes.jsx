import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Products from './pages/products'
import NotFound from './components/NotFound'
import Contacts from './pages/contacts'
import Alumn from './pages/alumns'
import PrivateRoute from './priveteRoute'

export default function Router(){
    return(
        // <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                
                <Route path='/contacts' element={<PrivateRoute><Contacts/></PrivateRoute>}/>
                <Route path='/contacts/alunos/:id' element={<PrivateRoute><Alumn/></PrivateRoute>}/>
            
                <Route path='/products' element={<Products/>}/>
                <Route path='/products/:id' element={<Products/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        // </BrowserRouter>
    )
}