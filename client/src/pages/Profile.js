
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
        <div>
        <h2>I see your an admin...</h2>
        <img src={sith} alt="sith lord" width="100%" height="100%"></img>
            </div>
    ) } else{
        return(
            <div>
                <h2></h2>
            <img src={feild} alt="sith lord" width="100%" height="100%"></img>
            </div>
        )
    }
}

return (

<div className="">

<Nav />

<h1>Welcome to your profile {loading? <p>loading...</p> : user.firstName}</h1>
<div className="Profilediv">
    {loading? <p>...</p> : isadmin()}
</div>
</div>

);

};


export default Profile;