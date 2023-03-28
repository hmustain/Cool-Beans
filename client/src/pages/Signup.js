import '../styles/Signup.css'
function Signup(props){
    function validatePassword() {
        var password = document.getElementById("password").value;
        var confirmPassword = document.getElementById("confirm-password").value;
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        alert("Passwords match.");
        return true;
        
    }
return (
<div className="container">
	
	<div className="card" >
		<div className="card-imageSU">	
			<h2 className="card-heading2">
				Get started <br></br>
				<small>Let us create your account</small>
			</h2>
		</div>
		<form className="card-form" >
			{/* <div class="input">
				<input type="text" class="input-field"  required/>
				<label class="input-label">Username:</label><br></br>
			</div> */}
						<div className="input">
				<input type="email" className="input-field"  required/>
				<label className="input-label">Create Email:</label><br></br>
			</div>
						<div className="input">
				<input type="password" className="input-field" id="password" required/>
				<label className="input-label">Create Password:</label><br></br>
			</div>
            <div className="input">
			<input type="password" className="input-field" id="confirm-password" required/>
			<label className="input-label">Confirm Password:</label><br></br>
		</div>
			<div className="action">
				<button className="action-button" onClick={validatePassword}>Signup</button>
			</div>
		</form>
		<div className="card-info">
			<p>allready have an account? <a href="#Login">Login</a></p>
		</div>
	</div>
</div>
  );
}

export default Signup;