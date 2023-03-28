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
<div class="container">
	
	<div class="card" >
		<div class="card-imageSU">	
			<h2 class="card-heading2">
				Get started <br></br>
				<small>Let us create your account</small>
			</h2>
		</div>
		<form class="card-form" >
			{/* <div class="input">
				<input type="text" class="input-field"  required/>
				<label class="input-label">Username:</label><br></br>
			</div> */}
						<div class="input">
				<input type="email" class="input-field"  required/>
				<label class="input-label">Create Email:</label><br></br>
			</div>
						<div class="input">
				<input type="password" class="input-field" id="password" required/>
				<label class="input-label">Create Password:</label><br></br>
			</div>
            <div class="input">
			<input type="password" class="input-field" id="confirm-password" required/>
			<label class="input-label">Confirm Password:</label><br></br>
		</div>
			<div class="action">
				<button class="action-button" onClick={validatePassword}>Signup</button>
			</div>
		</form>
		<div class="card-info">
			<p>allready have an account? <a href="#Login">Login</a></p>
		</div>
	</div>
</div>
  );
}

export default Signup;