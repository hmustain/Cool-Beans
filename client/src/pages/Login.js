import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations.js";
import Auth from "../utils/auth";
import "../styles/Login.css";
import Nav from "../components/NavTabs.js";
import Cart from "../components/Cart";

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
        <form className="card-form" onSubmit={handleFormSubmit}>
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
            <button className="action-button" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="card-info">
          <p>
            Dont have an account? <Link to="/Signup"><p>Signup Here</p></Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
