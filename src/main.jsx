import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Nav from './Nav'
import Form from './Form'
import Login from './Login'
import '../styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App/> */}
    {/* <Nav/> */}
    {/* <Form /> */}
    <Login/>
  </React.StrictMode>,
)
