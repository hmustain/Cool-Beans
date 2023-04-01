
import React from "react";

import Products from "../components/Products";

import Nav from "../components/NavTabs";
import sith from "../styles/images/adminimg.jpg"
import feild from "../styles/images/profileimg.jpg"
import { redirect } from 'react-router-dom';

// import CategoryMenu from "../components/CategoryMenu";

// import Cart from "../components/Cart";

import "../styles/Profile.css";

import { QUERY_ME } from "../utils/queries";

import { useQuery } from "@apollo/client";

const Profile = () => {


const { loading, data } = useQuery(QUERY_ME);

const user = data?.me;


console.log(user);

if (!user && !loading) {

window.location.assign('/login');

}
function isadmin(){
    if(user.role == "admin"){
    return(
        <div className="admindiv">
        <div class="card">
        <img src={sith} alt="sith lord" width="100%" height="100%"></img>
        <div class="card-body">
          <h5 class="card-title">Admin Details</h5>
          <p class="card-text"></p>
          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">FirstName: {user.firstName}</li>
          <li class="list-group-item">lastName: {user.lastName}</li>
          <li class="list-group-item">Email: {user.email}</li>
        </ul>
      
      </div>
       <div class="card">
  <div class="card-header">
    Reviews
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>A well-known quote, contained in a blockquote element.</p>
      <footer class="blockquote-footer">{user.firstName}</footer>
    </blockquote><br></br>
    <blockquote class="blockquote mb-0">
      <p>A well-known quote, contained in a blockquote element.</p>
      <footer class="blockquote-footer">{user.firstName}</footer>
    </blockquote><br></br>
    <blockquote class="blockquote mb-0">
      <p>A well-known quote, contained in a blockquote element.</p>
      <footer class="blockquote-footer">{user.firstName}</footer>
    </blockquote><br></br>
  </div>
</div> 
</div>
    ) } else{
        return(
            <div>
                <h2>Role: User</h2>
            <img src={feild} alt="not sith lord" width="100%" height="100%"></img>
            </div>
        )
    }
}

return (

<div className="profilediv">

<Nav />

<h1>Welcome to your profile {loading? <p>loading...</p> : user.firstName}</h1>
<div className="Profilediv">
    {loading? <p>...</p> : isadmin()}
</div>
</div>

);

};


export default Profile;
// reviews template


/* <div>
<h2>I see your an admin...</h2>

<div className="card">
<img src={sith} alt="sith lord" width="100%" height="100%"></img>
<div class="card-body">
<h5 class="card-title">Admin Info</h5>
<p>hi</p>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">An item</li>
<li class="list-group-item">A second item</li>
<li class="list-group-item">A third item</li>
</ul>
</div>
    </div> */