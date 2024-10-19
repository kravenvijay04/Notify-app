// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./login.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Password from "../../components/input/Password.jsx";
import { validateEmail } from '../../utils/helper.js';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    
  };

  return (
    <>
      <Navbar />
      <div id="login-box">
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <input 
            type='text' 
            placeholder='Email' 
            className='input' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Password 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className='info'>{error}</p>}
          <button type='submit' className='login-btn'>Login</button>
          <p className='Notreg'>
            Not registered yet?{" "} 
            <Link to="/signup">Create an Account</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default LogIn;
