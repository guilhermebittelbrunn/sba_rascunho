import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider locale={ptBR}>
    <App />
  </ConfigProvider>
  /* </React.StrictMode>, */
)
