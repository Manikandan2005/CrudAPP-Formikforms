import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'https://kit.fontawesome.com/2da65c2e5a.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App className='app'/>
  </React.StrictMode>,
)
