import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import CountProvider from './contexts/CountContext'
import Header from './components/Header'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CountProvider>
        <Header/>
        <App />
      </CountProvider>
  </React.StrictMode>,
)
