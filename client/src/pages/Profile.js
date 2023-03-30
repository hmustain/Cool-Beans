import React from "react";
import Products from "../components/Products";
import Nav from "../components/NavTabs";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
import "../styles/ShopAll.css";
const Profile = () => {
  return (
    <div className="Profilecontainer">
      {/* <CategoryMenu /> */}
      <Nav />
      <h1>Welcome to your profile</h1>
      
    </div>
  );
};

export default Profile;