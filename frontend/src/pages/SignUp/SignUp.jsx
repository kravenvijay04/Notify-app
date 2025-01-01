// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Navbar1 from '../../components/Navbar/Navbar1';
import { Link } from "react-router-dom";
import Password from "../../components/input/Password.jsx";
import { validateEmail } from '../../utils/helper.js';
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import axiosInstance from '../../utils/axiosInstance.js';
import Copyright from '../../components/copyright/Copyright.jsx';

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

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

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password
      })

      if (response.data && response.data.error) {
        setError(response.data.message);
        return
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }

    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      else {
        setError("An unexpected error occured. Please try again");
      }
    }

  }

  return (
    <>
      <Navbar1 />
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
      <Copyright/>
      <p id='patent1'><strong>©</strong> Notify- Notes taking app</p>
    </>
  )
}

export default SignUp;
