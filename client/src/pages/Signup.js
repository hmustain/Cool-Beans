import '../styles/Signup.css';
import React from 'react';
import Nav from '../components/NavTabs';
function Signup(props){
    function validatePassword() {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirm-password").value;
        if (password !== confirmPassword) {
            
			document.getElementById("errorspan").innerHTML = ('<span style="color:red;">Passwords Dont Match</span>');
            return false;
        }
        document.getElementById("errorspan").innerHTML = ('');
        return true;
        
    }
return (
<div className="signupcontainer">
	<Nav/>
	<div className="card">
  <div className="card-imageSU">
    <h2 className="card-heading2">
      Get started <br></br>
      <small>Let us create your account</small>
    </h2>
  </div>
  <form className="card-form" onSubmit={Signup}>
    <div className="input">
      <input type="text" className="input-field" id="firstname" required />
      <label className="input-label">Firstname:</label><br></br>
    </div>
	<div className="input">
      <input type="text" className="input-field" id="lastname" required />
      <label className="input-label">Lastname:</label><br></br>
    </div>
    <div className="input">
      <input type="email" className="input-field" id="email" required />
      <label className="input-label">Create Email:</label><br></br>
    </div>
    <div className="input">
      <input type="password" className="input-field" id="password" required />
      <label className="input-label">Create Password:</label><br></br>
    </div>
    <div className="input">
      <input type="password" className="input-field" id="confirm-password" required />
      <label className="input-label">Confirm Password:</label><br></br>
    </div>
	<div id="errorspan"></div>
    <div className="action">
      <button className="action-button" onClick={validatePassword}>Signup</button>
    </div>
  </form>
  <div className="card-info">
    <p>already have an account? <a href="/Login">Login</a></p>
  </div>
</div>







</div>
  );
}

export default Signup;