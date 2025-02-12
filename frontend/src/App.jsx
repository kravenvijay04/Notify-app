/* eslint-disable no-unused-vars */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login/'
import SignUp from './pages/SignUp/SignUp/'
import Home from './pages/Home/Home/'
import "./style.css"

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<SignUp />} />
    </Routes>
  </Router>
);


const App = () => {
  return (
    <div className='bg'>
      <div>
        {routes}
      </div>
    </div>
  )
}
 
export default App
