import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations.js";
import Auth from "../utils/auth";
import '../styles/Login.css'

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
  
    <div className="container">
<div className="card">
  <div className="card-image">	
    <h2 className="card-heading">
      
      <small>Sign in to your account</small>
    </h2>
  </div>
  <form className="card-form" onSubmit={handleFormSubmit}>
          <div className="input">
      <input  name="email" type="email" className="input-field"  placeholder="youremail@test.com" id="email" onChange={handleChange} required/><br></br>
      <label className="input-label">Email:</label>
    </div>
          <div className="input">
      <input name="password" type="password" className="input-field" id="pwd" required onChange={handleChange}/><br></br>
      <label className="input-label">Password:</label>
    </div>
    {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
    <div className="action">
      <button className="action-button" type="submit">Login</button>
    </div>
  </form>
  <div className="card-info">
    <p>Dont have an account? <a href="#Signup">Signup Here</a></p>
  </div> 
</div>
</div>

  );
}

export default Login;
{/* <div class="container" onSubmit={handleFormSubmit}>
<div class="card">
  <div class="card-image">	
    <h2 class="card-heading">
      
      <small>Sign in to your account</small>
    </h2>
  </div>
  <form class="card-form">
          <div class="input">
      <input type="email" class="input-field"  onChange={handleChange} required/><br></br>
      <label class="input-label">Email</label>
    </div>
          <div class="input">
      <input type="password" class="input-field" required/><br></br>
      <label class="input-label" onChange={handleChange}>Password</label>
    </div>
    <div class="action">
      <button class="action-button">Login</button>
    </div>
  </form>
  {/* <div class="card-info">
    <p>By signing up you are agreeing to our <a href="#">Terms and Conditions</a></p>
  </div> */}
// </div>
// </div>
// {error ? (
//   <div>
//     <p className="error-text">The provided credentials are incorrect</p>
//   </div>
// ) : null} */}

{/* <Link to="/signup">← Go to Signup</Link> */}