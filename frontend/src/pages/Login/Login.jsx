// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/input/Password.jsx";
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import Navbar1 from '../../components/Navbar/Navbar1.jsx';
import Copyright from '../../components/copyright/Copyright.jsx';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate =useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("")
    
    try{
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }

    }
    catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("An unexpected error occured. Please try again");
      }
    }
  };

  return (
    <>
      <Navbar1 />
      <div id='IDlog'>
      <div id="login-box">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input 
            type='text' 
            placeholder='Email' 
            className='input1' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Password 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p id='info'>{error}</p>}
          <button type='submit' className='login-btn'>Login</button>
          <p id='Notreg'>
            Not registered yet?{" "} 
            <Link to="/signup">Create an Account</Link>
          </p>
        </form>
      </div>
      <Copyright/>
      <footer id='patent'><strong>©</strong> Notify- Notes taking app</footer>
      </div>
      
    </>
  );
}

export default LogIn;
