import React, { useState, useRef } from "react";

import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations.js";
import Auth from "../utils/auth";
import {VerifiRecap} from '../utils/API'
import "../styles/Login.css";
import Nav from "../components/NavTabs.js";
import Cart from "../components/Cart";
import ReCAPTCHA from "react-google-recaptcha"
function Login(props) {
  const captchaRef = useRef(null)
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);


const handleCaptcha = (e) => {

  e.preventDefault();
  
  const token = captchaRef.current.getValue();
  // console.log(token,"here")
  captchaRef.current.reset();
if(token){
handleFormSubmit(e,token)
}else{
  document.getElementById("recap").innerHTML=`<span style="color:red;">Please check Recaptcha!</span>`;
}

}



  const handleFormSubmit = async (event,token) => {
    event.preventDefault()
    // try {
    //   // console.log("token again", token)
      
    //   // Sending secret key and response token to Google Recaptcha API for authentication.
    //   const response = await VerifiRecap(token);
  
    //   // Check response status and send back to the client-side
    //   if (response.ok) {
    //     console.log("Human 👨 👩");
        
    //   } else {
    //    console.log("Robot 🤖");
      
    //   }
    // } catch (error) {
    //   // Handle any errors that occur during the reCAPTCHA verification process
    //   console.error(error);
    
    //  }

  
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      document.getElementById(
        "errordiv"
      ).innerHTML = `<span style="color:red;">Incorrect email or password!</span>`;
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
    <div className="Logincontainer">
      <Nav />
      <Cart />
      <div className="card">
        <div className="card-image">
          <h2 className="card-heading">
            <small>Sign in to your account</small>
          </h2>
        </div>
        <form className="card-form" onSubmit={handleCaptcha}>
          <div className="input">
            <input
              name="email"
              type="email"
              className="input-field"
              placeholder="youremail@test.com"
              id="email"
              onChange={handleChange}
              required
            />
            <br></br>
            <label className="input-label">Email:</label>
          </div>
          <div className="input">
            <input
              name="password"
              type="password"
              className="input-field"
              id="pwd"
              required
              onChange={handleChange}
            />
            <br></br>
            <label className="input-label">Password:</label>
          </div>
          <div id="errordiv"></div>
          
          <div className="action">
            <div className="recapdiv" >
          <ReCAPTCHA 
          size="normal"
          sitekey={process.env.REACT_APP_SITE_KEY}
          onChange={handleCaptcha}
          ref={captchaRef}/> 
          <div id="recap"></div><br></br>
          
          </div>
            <button className="action-button" type="submit">
              Login
            </button>
          </div>
         
        </form>
        <div className="card-info">
          <div>
            Dont have an account? <Link to="/Signup"><p>Signup Here</p></Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
