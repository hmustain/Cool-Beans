//import style / mutations/ components /utils / usestate and link
import "../styles/Signup.css";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Nav from "../components/NavTabs";
import Auth from "../utils/auth";
import Cart from "../components/Cart";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";
//exported Signup page
function Signup(props) {
  //declare variables and states declare set variables.
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);
  //after form submit run this function that adds user to database
  //then logs them in giving them auth token
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };
  //updates formstate onchange or when user types
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  //function not being used to validate password and confirm password on change but broke code
  function validatePassword() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    if (password !== confirmPassword) {
      document.getElementById("errorspan").innerHTML =
        '<span style="color:red;">Passwords Dont Match</span>';
      return false;
    }
    document.getElementById("errorspan").innerHTML = "";
    return true;
  }

  return (
    <div className="signupcontainer">
      <Nav />
      <div className="card">
        <div className="card-imageSU">
          <h2 className="card-heading2">
            Get started <br></br>
            <small>Let us create your account</small>
          </h2>
        </div>
        <form className="card-form" onSubmit={handleFormSubmit}>
          <div className="input">
            <input
              className="input-field"
              id="firstName"
              name="firstName"
              type="firstName"
              onChange={handleChange}
              required
            />
            <label className="input-label">Firstname:</label>
            <br></br>
          </div>
          <div className="input">
            <input
              className="input-field"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
              required
            />
            <label className="input-label">Lastname:</label>
            <br></br>
          </div>
          <div className="input">
            <input
              type="email"
              className="input-field"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
            <label className="input-label">Create Email:</label>
            <br></br>
          </div>
          <div className="input">
            <input
              type="password"
              className="input-field"
              id="pwd"
              name="password"
              onChange={handleChange}
              required
            />
            <label className="input-label">Create Password:</label>
            <br></br>
          </div>
          {/* <div className="input">
      <input type="password" className="input-field" id="confirm-password" name="password" onChange={validatePassword} required />
      <label className="input-label">Confirm Password:</label><br></br>
    </div> */}
          <div id="errorspan"></div>
          <div className="action">
            <button className="action-button" type="submit">
              Signup
            </button>
          </div>
        </form>
        <div className="card-info">
          <p>already have an account? </p>
          <Link to="/Login">
            Login Here
          </Link>
        </div>
      </div>

      <Cart />
    </div>
  );
}

export default Signup;
