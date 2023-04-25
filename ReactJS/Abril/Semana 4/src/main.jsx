import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Globalstyled from './styles/grobal_style'
import Router from './routes'


import loginReducer from './reducer/loginReducer'
import { createStore } from 'redux'
import {Provider} from 'react-redux'

const store = createStore(loginReducer);

function Application(){
 
  return(
    <BrowserRouter>
      {/* <Globalstyled> */}
          <Provider store={store}>
            <NavBar/>
          
              <Router/>

            <Footer/>
          </Provider>
      {/* </Globalstyled> */}
    </BrowserRouter>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(<Application/>)


