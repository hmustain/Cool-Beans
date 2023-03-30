
import React from "react";

import Products from "../components/Products";

import Nav from "../components/NavTabs";

import { redirect } from 'react-router-dom';

// import CategoryMenu from "../components/CategoryMenu";

// import Cart from "../components/Cart";

import "../styles/ShopAll.css";

import { QUERY_ME } from "../utils/queries";

import { useQuery } from "@apollo/client";

const Profile = () => {


const { loading, data } = useQuery(QUERY_ME);

const user = data?.me;


console.log(user);

if (!user && !loading) {

window.location.assign('/login');

}

return (

<div>

<Nav />

welcome to your profile {loading? <p>loading...</p> : user.firstName}

</div>

);

};


export default Profile;