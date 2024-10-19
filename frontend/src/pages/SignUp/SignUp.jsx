// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from "react-router-dom";
import Password from "../../components/input/Password.jsx";
import { validateEmail } from '../../utils/helper.js';
import "./signUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  
  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

  }

  return (
    <>
      <Navbar />
      <div id="Signup-box">
        <form onSubmit={handleSignup}>
          <h3>Sign Up</h3>
          <input 
            type='text' 
            placeholder='Name' 
            className='input' 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
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
          <button type='submit' className='Signup-btn'>Sign Up</button>
          <p className='Notreg'>
            Already have an Account?{" "} 
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default SignUp;
